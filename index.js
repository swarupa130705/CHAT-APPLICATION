const express = require('express');
const app = express();

// ✅ Create HTTP server before using it
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// ✅ Serve static files from /public
app.use(express.static('public'));

// ✅ Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// ✅ Start the server AFTER defining http
http.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
