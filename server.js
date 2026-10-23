import http from 'node:http';
import { readFile } from 'node:fs/promises';
const files = { '/': ['home.html', 'text/html'], '/signin': ['index.html', 'text/html'], '/home.css': ['home.css', 'text/css'], '/home.js': ['home.js', 'text/javascript'], '/app.js': ['app.js', 'text/javascript'], '/style.css': ['style.css', 'text/css'] };
http.createServer(async (req, res) => {
  const entry = files[new URL(req.url, 'http://localhost').pathname];
  if (!entry) { res.writeHead(404); res.end('Not found'); return; }
  try { const body = await readFile(new URL(`./public/${entry[0]}`, import.meta.url)); res.writeHead(200, { 'Content-Type': `${entry[1]}; charset=utf-8` }); res.end(body); }
  catch { res.writeHead(500); res.end('Unable to load page'); }
}).listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log('Faxtech Design listening on port ' + (process.env.PORT || 3000)));
