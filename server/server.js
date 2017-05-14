const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connect', (socket) => {
  console.log('Client is connected');

  socket.on('disconnect', () => {
    console.log('Client is disconnected');
  });

});


app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Listen on port: ${port}`);
});
