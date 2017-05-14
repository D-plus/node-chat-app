const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

//socket.emit - emit for single current connection, but io.emit emits event to all connections

io.on('connect', (socket) => {
  //console.log('Client is connected');

  socket.on('createMessage', message => {
    //console.log('Client sent us message', message);

    // send it to the all users in chat
    io.emit('newMessage', Object.assign(message, { timeStamp: new Date().getTime() }) );
  })

  // socket.on('disconnect', () => {
  //   console.log('Client is disconnected');
  // });

});


app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Listen on port: ${port}`);
});
