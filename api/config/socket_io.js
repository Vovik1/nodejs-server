const socketIo = require('socket.io');
const app = require('../../app');
const webinarController = require('../controllers/webinars-controller');

const init = (server) => {
  const io = socketIo(server, {allowUpgrades: true});

  io.on('connection', (socket) => {
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
    });

    socket.on('Leave room', (roomId) => {
      socket.leave(roomId);
    });

    webinarController(socket);
    socket.on('disconect', () => {
      socket.disconnect(true);
    })
  });

  app.io = io;
};

module.exports = { init };
