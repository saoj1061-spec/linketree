const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIR = __dirname;

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/calculadora.html' : req.url;
  filePath = path.join(DIR, filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Calculadora rodando em http://localhost:${PORT}`);
});
