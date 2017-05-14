const socket = io();

socket.on('connect', () => {
  console.log('connected');

  //socket.emit('createMessage', { from: 'Dmitriy', text: 'Hi to everyone!'  });
});

socket.on('newMessage', message => {
  console.log('Here is a new message: -', message);
});

// socket.on('disconnect', () => {
//   console.log('server is disconnected');
// });
