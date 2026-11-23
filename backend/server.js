const http = require('http')
const { spawn } = require('child_process');

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

  } else {
    res.statusCode = 404;
    res.end('not found');
  }
});

server.listen(3000, () => {
    console.log("Server running on port 3000")
})