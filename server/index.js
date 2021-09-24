const { Server } = require("socket.io");
const express = require('express');
const http = require('http');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

const port = 5000


let messages = ['mess1', 'mess2']

app.get('/', (req, resp) => {
  resp.send('123')
});


io.on('connection', (socket) => {
  console.log('a user connected ');

    socket.on('disconnect', () =>{
        console.log('user has been disconnected')
    })

    socket.on('sendMesage', (data) =>{
        
        messages.push(data)
        console.log(messages)
        socket.emit('returnMessages', messages[messages.length - 1])
        socket.broadcast.emit('returnMessages', messages[messages.length - 1])
    })

    
});


server.listen(port, () => {
  console.log('listening on :',port);
});