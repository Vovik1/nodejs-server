const socket_io = require('socket.io');
const app = require('../../app');

const init = server => {
    const io = socket_io(server);

    io.on('connection', socket => {

        socket.on('join_room', room_id => {
            socket.join(room_id);
        });

        socket.on('Leave room', room_id => {
            socket.leave(room_id);
        });

        require('../controllers/webinars-controller')(socket);


    });

    app.io = io;
}

module.exports = {init};
