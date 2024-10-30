const express = require('express');
const app = express();
const path = require('path');
const { Server } = require("socket.io");

const http = require('http');
const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
  });

app.use(express.static(path.resolve('./public')));

app.get('/', (req,res)=>{
    return res.sendFile("/public/index.html");
})

server.listen(9000, ()=>{
    console.log("server listening at port 9000!")
})