

const { Server } = require("socket.io");
const express = require('express');
const http = require('http');

const app = express();

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')


app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app);



const io = new Server(server);

const port = 5000


let messages = []

app.get('/get_messages', (req, resp) => {
  resp.send(messages)
});

app.post('/auth', (req, resp) =>{
  if(req.body.password == 'zatonnoe'){
    resp.cookie('isAuth', true)
    resp.cookie('name', req.body.name)
    resp.send()
  }else{
    resp.send(201)
  }
  
})

io.on('connection', (socket) => {
  console.log('a user connected ');

    socket.on('disconnect', () =>{
        console.log('user has been disconnected')
    })

    socket.on('sendMesage', (data) =>{
        
        messages.push(data)

        socket.emit('returnMessages', messages[messages.length - 1])
        socket.broadcast.emit('returnMessages', messages[messages.length - 1])
    })

    
});


server.listen(port, () => {
  console.log('listening on :',port);
});