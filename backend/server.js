const http = require('http')
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

let camera = null;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');   // FIRST
  console.log(req.url);

  if (req.url === '/on') {
    if (camera === null) {
      camera = spawn('ustreamer', ['--device=/dev/video0',
      '--host=0.0.0.0',
      '--port=8080',
      '--format=MJPEG',
      '--resolution=1280x720',
      '--desired-fps=15'
     ], { stdio: 'ignore' });
      camera.on('exit', () => { camera = null; });
    }
    res.end('camera on');

  } else if (req.url === '/off') {
    if (camera !== null) {
      camera.kill();
    }
    res.end('camera off');        

  } else if (req.url === '/status') {
    res.end(camera ? 'on' : 'off');

  } else if (req.url === '/' || req.url === '/styles.css' || req.url === '/script.js') {
    const fileName = req.url === '/' ? 'index.html' : req.url.slice(1);
    const filePath = path.join(__dirname, '..', 'frontend', fileName);

    const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
    res.setHeader('Content-Type', types[path.extname(fileName)]);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('error loading file');
      } else {
        res.end(data);
      }
    }); 
  } else {
    res.statusCode = 404;
    res.end('not found');
  }
});

server.listen(3000, () => {
    console.log("Server running on port 3000")
})