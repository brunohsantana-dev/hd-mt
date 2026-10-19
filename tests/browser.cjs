const { chromium, expect } = require('@playwright/test');
const { default: AxeBuilder } = require('@axe-core/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const failures=[]; const checks=[];
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const page=await context.newPage(); const errors=[]; const requests=[];
 page.on('pageerror', e=>errors.push(e.message));
 page.on('request', r=>requests.push(r.url()));
 const run=async(name,fn)=>{try{await fn();checks.push(name);console.log('PASS',name)}catch(e){failures.push(name+': '+e.message);console.error('FAIL',name,e.message)}};
 await page.goto('http://127.0.0.1:4173');
 await run('English landing content and individual booking destination',async()=>{
   assert.match(await page.locator('h1').textContent({timeout:2000}),/Your hair/);
   assert.equal(await page.locator('html').getAttribute('lang'),'en');
   const links=await page.locator('[data-booking]').evaluateAll(els=>els.map(el=>el.href));
   assert.ok(links.length>=3);
   assert.ok(links.every(h=>h.includes('maira-tudine-croydon-20-elizabeth-street-cpz9v9fr')));
   assert.equal(await page.locator('#visit .contact a').getAttribute('href'),'https://www.instagram.com/hairdresser_mairatudine/');
   assert.equal(await page.locator('#work .work-copy a').getAttribute('href'),'https://www.instagram.com/hairdresser_mairatudine/');
   assert.equal(await page.locator('.work-gallery figure').count(),6);
   assert.match(await page.locator('.hero-photo img').getAttribute('src'),/photo-191451\.png$/);
   assert.match(await page.locator('.portrait-frame img').getAttribute('src'),/photo-191634\.png$/);
 });
 if(failures.length){await browser.close();process.exitCode=1;return;}
 await run('Complete Portuguese, persistence and unchanged section',async()=>{
   await page.locator('nav a[href="#services"]').click();
   await page.locator('[data-language="pt"]').click();
   assert.equal(await page.locator('html').getAttribute('lang'),'pt-BR');
   assert.match(await page.locator('h1').textContent(),/Seu cabelo/);
   assert.equal(new URL(page.url()).hash,'#services');
   assert.equal(await page.locator('[data-language="pt"]').getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('.work-gallery figcaption').first().textContent(),'Cachos longos e escuros');
   assert.match(await page.locator('.portrait-frame img').getAttribute('alt'),/Maíra Tudine/);
   await page.reload();
   assert.equal(await page.locator('html').getAttribute('lang'),'pt-BR');
 });
 fs.mkdirSync('test-results',{recursive:true});
 for(const lang of ['en','pt']) {
   await page.locator(`[data-language="${lang}"]`).click();
   for(const width of [320,360,390,768,1440]) {
     await page.setViewportSize({width,height:900});
     await run(`${lang} / ${width}px layout, images and accessibility`,async()=>{
       for (const img of await page.locator('img').all()) await img.scrollIntoViewIfNeeded();
       await expect.poll(() => page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0))).toBe(true);
       await page.evaluate(()=>scrollTo(0,0));
       assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth), 'Horizontal overflow');
       assert.ok(await page.locator('img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0)), 'Broken image');
       const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
       assert.deepEqual(result.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[]);
       if([360,1440].includes(width)) await page.screenshot({path:`test-results/${lang}-${width}.png`,fullPage:true});
     });
   }
 }
 await page.setViewportSize({width:360,height:800});
 await run('Mobile menu opens, Escape restores focus, section selection closes',async()=>{
   const toggle=page.locator('#menu-toggle');
   await toggle.focus(); await page.keyboard.press('Enter');
   assert.equal(await toggle.getAttribute('aria-expanded'),'true');
   await page.keyboard.press('Tab'); await page.keyboard.press('Escape');
   assert.equal(await toggle.getAttribute('aria-expanded'),'false');
   assert.equal(await page.evaluate(()=>document.activeElement.id),'menu-toggle');
   await toggle.click(); await page.locator('#site-nav a[href="#services"]').click();
   assert.equal(await toggle.getAttribute('aria-expanded'),'false');
   assert.equal(new URL(page.url()).hash,'#services');
   assert.equal(await page.evaluate(()=>document.activeElement.id),'services');
 });
 await run('Reduced motion and large text',async()=>{
   await page.emulateMedia({reducedMotion:'reduce'});
   assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
   await page.addStyleTag({content:'html { font-size: 200% !important; }'});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await page.screenshot({path:'test-results/pt-large-text.png',fullPage:true});
 });
 await run('Storage unavailable still allows language switching',async()=>{
   const isolated=await browser.newContext();
   await isolated.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked')}})});
   const p=await isolated.newPage(); await p.goto('http://127.0.0.1:4173');
   await p.locator('[data-language="pt"]').click();
   assert.equal(await p.locator('html').getAttribute('lang'),'pt-BR');
   await isolated.close();
 });
 await run('No JavaScript retains English navigation and booking',async()=>{
   const isolated=await browser.newContext({javaScriptEnabled:false,viewport:{width:360,height:800}});
   const p=await isolated.newPage(); await p.goto('http://127.0.0.1:4173');
   assert.match(await p.locator('h1').textContent(),/Your hair/);
   assert.ok(await p.locator('#site-nav a').first().isVisible());
   assert.ok(await p.locator('[data-booking]').first().isVisible());
   await isolated.close();
 });
 await run('Direct local file supports Portuguese',async()=>{
   const p=await context.newPage(); await p.goto(require('node:url').pathToFileURL(path.resolve('index.html')).href);
   await p.locator('[data-language="pt"]').click(); assert.equal(await p.locator('html').getAttribute('lang'),'pt-BR');
   await p.close();
 });
 await run('Touch interaction in a mobile browser context',async()=>{
   const phone=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true});
   const p=await phone.newPage(); await p.goto('http://127.0.0.1:4173');
   await p.locator('[data-language="pt"]').tap();
   await p.locator('#menu-toggle').tap();
   await p.locator('#site-nav a[href="#visit"]').tap();
   assert.equal(await p.locator('#menu-toggle').getAttribute('aria-expanded'),'false');
   assert.equal(new URL(p.url()).hash,'#visit');
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await phone.close();
 });
 await run('Keyboard focus stays visible above the mobile booking bar',async()=>{
   const isolated=await browser.newContext({viewport:{width:360,height:800},reducedMotion:'reduce'});
   const p=await isolated.newPage(); await p.goto('http://127.0.0.1:4173');
   const count=await p.locator('a:visible,button:visible').count();
   for(let i=0;i<count;i++) {
     await p.keyboard.press('Tab');
     const focused=await p.evaluate(()=>{
       const el=document.activeElement; const rect=el.getBoundingClientRect();
       const bar=document.querySelector('.mobile-booking').getBoundingClientRect();
       return {text:el.textContent.trim(),top:rect.top,bottom:rect.bottom,limit:el.closest('.mobile-booking')?innerHeight:bar.top};
     });
     assert.ok(focused.top>=-1 && focused.bottom<=focused.limit+1,JSON.stringify(focused));
   }
   await isolated.close();
 });
 await run('Local server does not serve project documents',async()=>{
   assert.equal((await fetch('http://127.0.0.1:4173/AGENTS.md')).status,404);
   assert.equal((await fetch('http://127.0.0.1:4173/docs/research/fresha.html')).status,404);
 });
 await run('No runtime errors or third-party page requests',async()=>{
   assert.deepEqual(errors,[]);
   assert.deepEqual(requests.filter(url=>!url.startsWith('http://127.0.0.1:4173')),[]);
 });
 fs.writeFileSync('test-results/results.json',JSON.stringify({checks,failures},null,2));
 await browser.close(); if(failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
