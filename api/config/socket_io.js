const socketIo = require("socket.io");
const app = require("../../app");
const webinarController = require("../controllers/webinars-controller");

const init = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
    });

    socket.on("Leave room", (roomId) => {
      socket.leave(roomId);
    });

    webinarController(socket);
  });

  app.io = io;
};

module.exports = { init };


module.exports = {init};
