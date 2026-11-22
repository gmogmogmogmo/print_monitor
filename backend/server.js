const http = require('http')
const { spawn } = require('child_process');

let camera = null;

const server = http.createServer((req, res)=> {
    console.log(req.url)
    if(req.url === '/on'){
        if(camera === null){
        camera = spawn('ustreamer', [
        '--device=/dev/video0',
        '--host=0.0.0.0',
        '--port=8080',
        '--format=MJPEG',
        '--resolution=1280x720',
        '--desired-fps=15'
        ], { stdio: 'ignore' })
        } 
        res.end('camera on')
    }
    else if (req.url === '/off'){
        camera.kill()
    }
    res.end('camera off')

    res.setHeader('Access-Control-Allow-Origin', '*');
})

server.listen(3000, () => {
    console.log("Server running on port 3000")
})