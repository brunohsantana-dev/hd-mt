'use strict';
(() => {
  const translations = window.MAIRA_TRANSLATIONS;
  if (!translations) return; // Keep the complete English page usable if this asset fails.
  const root = document.documentElement;
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('menu-toggle');
  const languageButtons = document.querySelectorAll('[data-language]');
  const mobile = window.matchMedia('(max-width: 860px)');

  function setLanguage(requested, announce = false) {
    const language = requested === 'pt' ? 'pt' : 'en';
    const copy = translations[language];
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const text = copy[element.dataset.i18n];
      if (typeof text !== 'string') return;
      const lines = text.split('\n');
      element.replaceChildren();
      lines.forEach((line, index) => {
        if (index) element.append(document.createElement('br'));
        element.append(document.createTextNode(line));
      });
    });
    for (const [attribute, dataKey] of [['aria-label','i18nAria'],['alt','i18nAlt']]) {
      document.querySelectorAll(attribute === 'alt' ? '[data-i18n-alt]' : '[data-i18n-aria]').forEach(element => {
        const text = copy[element.dataset[dataKey]];
        if (typeof text === 'string') element.setAttribute(attribute,text);
      });
    }
    root.lang = language === 'pt' ? 'pt-BR' : 'en';
    document.title = copy.title;
    document.querySelector('meta[name="description"]').content = copy.description;
    languageButtons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.language === language)));
    try { window.localStorage.setItem('maira-language',language); } catch { /* The preference is optional. */ }
    if (announce) document.getElementById('language-status').textContent = copy.announcement;
  }

  function setMenu(open, restoreFocus = false) {
    nav.classList.toggle('is-open',open);
    toggle.setAttribute('aria-expanded',String(open));
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click',() => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false,true);
  });
  nav.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    const hash = link.getAttribute('href');
    setMenu(false);
    if (hash.startsWith('#')) document.getElementById(hash.slice(1))?.focus({preventScroll:true});
  });
  mobile.addEventListener('change',() => {
    const focusWasInNav = nav.contains(document.activeElement);
    setMenu(false,mobile.matches && focusWasInNav);
  });
  languageButtons.forEach(button => button.addEventListener('click',() => setLanguage(button.dataset.language,true)));
  let preferred = 'en';
  try { preferred = window.localStorage.getItem('maira-language') || 'en'; } catch { /* English remains the default. */ }
  setLanguage(preferred);
  document.querySelector('.languages').hidden = false;
  toggle.hidden = false;
  root.classList.add('js');
})();
