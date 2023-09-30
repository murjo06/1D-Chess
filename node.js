const WebSocket = require("ws");

const server = WebSocket.Server({port: 3000});

server.on("connection", socket => {
    socket.on("message", message => {
        console.log(message);
        socket.send("GOD WHY DID I WRITE THAT");
    });
});