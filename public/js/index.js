const socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {

  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  let li = jQuery('<li></li>');
  let a = jQuery("<a target='_blank'>My location now is ...</a>")

  a.attr('href', message.url);
  li.text(message.from);
  li.append(a);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  let inputText = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: inputText.val()
  }, function () {
    inputText.val('');
  });
});

let geoButton = jQuery('#send-location');

geoButton.on('click', (e) => {
  if (!navigator.geolocation) {
    alert('Browser doesn`t support this feature');
  }

  geoButton.attr('disabled', true).text('Sending location...');

  navigator.geolocation.getCurrentPosition((location) => {
    console.log(location)
    socket.emit('createLocationMessage', {latitude: location.coords.latitude, longitude: location.coords.longitude}, () => geoButton.removeAttr('disabled').text('Send location') );
  }, (err) => {
    geoButton.removeAttr('disabled').text('Send location');
    alert('location wasn`t found');
  })

});
