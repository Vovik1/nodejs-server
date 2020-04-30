const socket_io = require('socket.io');
const app = require('../../app');

const init = server => {
    const io = socket_io(server);

    io.on('connection', socket => {
        console.log('socket is running!!');

        socket.on('join_room', room_id => {
            socket.join(room_id);
        });

        socket.on('Leave room', room_id => {
            socket.leave(room_id);
        });
    });

    app.io = io;
}

module.exports = {init};
