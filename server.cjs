const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.ttf':'font/ttf','.svg':'image/svg+xml','.ico':'image/x-icon'};
const allowed = new Set(['index.html','styles.css','translations.js','app.js','favicon.svg']);
const server = http.createServer(async (req,res)=>{
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file = pathname === '/' ? 'index.html' : pathname.slice(1);
    if (!allowed.has(file) && !/^assets\/[a-zA-Z0-9_-]+\.(jpg|webp|png|svg)$/.test(file) && !/^assets\/fonts\/[a-zA-Z0-9_-]+\.ttf$/.test(file)) {
      res.writeHead(404); res.end('Not found'); return;
    }
    const content = await fs.readFile(path.join(root,file));
    res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow','X-Content-Type-Options':'nosniff'});
    res.end(content);
  } catch {res.writeHead(404);res.end('Not found');}
});
server.listen(Number(process.env.PORT || 4173),'127.0.0.1',()=>console.log('Local preview: http://127.0.0.1:'+server.address().port));
