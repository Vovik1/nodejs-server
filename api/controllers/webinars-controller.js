const webinars = {};

module.exports = (socket) => {
  socket.on('new_user_joined', ({ lectureId, userId, userName, imageUrl }) => {
      if (webinars[lectureId].activeUsers[userId] === undefined) {
        webinars[lectureId].activeUsers[userId] = { userId, tabs: 1 };
        webinars[lectureId].usersOnline += 1;
        socket.broadcast.emit('update_online_users', {
          id: lectureId,
          usersOnline: webinars[lectureId].usersOnline,
        });
      } else {
        webinars[lectureId].activeUsers[userId].tabs += 1;
      }

      socket.join(lectureId);

      socket.to(lectureId).emit('update-user-list', {
        id: userId,
        userName,
        imageUrl,
        socketId: socket.id,
      });

      socket
        .to(lectureId)
        .emit('receive_all_comments', { socketId: socket.id });
  });

  socket.on('add_new_webinar', ({ webinarName, firstName, surName }) => {
    socket.join(socket.id);
    webinars[socket.id] = {
      webinarName,
      usersOnline: 0,
      id: socket.id,
      firstName,
      surName,
      activeUsers: [],
    };
  });

  socket.on('new_comment', (to, data) => {
    socket.to(to).emit('new_comment', data);
  });

  socket.on('send_all_comments', ({ to, comments }) => {
    socket.to(to).emit('get_all_comments', comments);
  });

  socket.on('stop_webinar', () => {
    socket.to(socket.id).emit('webinar_stoped');
    delete webinars[socket.id];
  });

  socket.on('get_all_webinars', () => {
    socket.emit('get_all_webinars', Object.values(webinars));
  });

  socket.on('make-offer', (data) => {
    socket.to(data.to).emit('offer-made', {
      offer: data.offer,
      socket: socket.id,
    });
  });

  socket.on('make-answer', (data) => {
    socket.to(data.to).emit('answer-made', {
      socket: socket.id,
      answer: data.answer,
    });
  });

  socket.on('candidate', (id, message) => {
    socket.to(id).emit('candidate', socket.id, message);
  });

  socket.on('disconnect_user', ({ userId, lectureId }) => {
    if (webinars[lectureId] !== undefined) {
      if (webinars[lectureId].activeUsers[userId].tabs > 1) {
        webinars[lectureId].activeUsers[userId].tabs -= 1;
      } else {
        delete webinars[lectureId].activeUsers[userId];
        webinars[lectureId].usersOnline -= 1;
        socket.broadcast.emit('update_online_users', {
          id: lectureId,
          usersOnline: webinars[lectureId].usersOnline,
        });
        socket.to(lectureId).emit('remove-user', {
          id: userId,
        });
      }
      socket.leave(lectureId);
    }
  });
};
