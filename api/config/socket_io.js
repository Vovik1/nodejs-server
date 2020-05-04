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

        socket.on('new_webinar_started', webinar_info => {
            /*webinars.push(webinar_info); */
            socket.join('Taras');
        });

        socket.on('add-user', user => {
            socket.emit('add-user', user);
        });

        socket.on('remove-user', user => {
            socket.emit('remove-user', user);
        });

        socket.on('make-offer', data => {
            console.log(data);
            socket.to(data.to).emit('offer-made', {
                offer: data.offer,
                socket: socket.id
            });
        });

        socket.on('make-answer', data => {
            socket.emit('answer-made', {
                socket: socket.id,
                answer: data.answer
            });
        });

        socket.on('stop_webinar', webinar_id => {
            for(let i=0; i<webinars.length; i++){
                if(webinars[i].id == webinar_id){
                    delete webinars[i];
                }
            }
            webinars = webinars.filter(el => {
                return el != null && el != '' && el != undefined;
            });
        });

    });

    app.io = io;
}

module.exports = {init};
