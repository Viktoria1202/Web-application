
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Обработчик события добавления продукта
  socket.on('addProduct', (productName) => {
    io.emit('productAdded', productName);
  });

  // Обработчик события удаления продукта
  socket.on('deleteProduct', () => {
    io.emit('productDeleted');
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(8080, () => {
  console.log('Server is running on port 8080');
});