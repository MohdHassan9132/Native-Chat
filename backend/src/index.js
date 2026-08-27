import http from 'http'
import { Server } from 'socket.io'
const httpServer = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Hello from backend",
        }));
    }

});
const webSocket = new Server(httpServer,{
    cors:{
        origin: "http://localhost:3000"
    }
})
webSocket.on("connection", (socket) => {
    console.log(socket.id)
});
httpServer.listen(8000,()=>{
    
    console.log("http server is listening on port 8000")
})

