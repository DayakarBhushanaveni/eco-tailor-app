const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Real-time suggestion example
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('tryon-request', (data) => {
    // Simulate real-time suggestion
    socket.emit('tryon-suggestion', { suggestion: 'Earthy tones suit you!' });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));