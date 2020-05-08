const socket_io = require('socket.io');

module.exports = app => {
    const io = socket_io(app);
    io.on('connection', socket => {

        socket.on('join_room', room_id => {
            socket.join(room_id);
            console.log(socket.adapter.rooms[room_id]);
        });

        socket.on('message', ({room, message}) => {
            socket.to(room).emit('New message received', message);
        })

        socket.on('Leave room', room_id => {
            socket.leave(room_id);
            console.log(socket.adapter.rooms[room_id]);
        });

    });
}