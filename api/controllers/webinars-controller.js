let activeUsers = [];
let webinars = [];

module.exports = (socket) => {
  socket.on("new_user_joined", (teacherId) => {
    const existingUser = activeUsers.includes(socket.id);

    if (!existingUser) {
      activeUsers.push(socket.id);

      socket.join(teacherId);

      socket.to(teacherId).emit("update-user-list", {
        id: socket.id,
      });
    }
  });

  socket.on("add_new_webinar", ({ webinarName, firstName, surName }) => {
    socket.join(socket.id);
    webinars.push({
      webinarName,
      id: socket.id,
      firstName,
      surName,
    });
  });

  socket.on("new_comment", (to, data) => {
    socket.to(to).emit("new_comment", data);
  });

  socket.on("stop_webinar", () => {
    webinars = webinars.filter((webinar) => webinar.id !== socket.id);
  });

  socket.on("get_all_webinars", () => {
    socket.emit("get_all_webinars", webinars);
  });

  socket.on("make-offer", (data) => {
    socket.to(data.to).emit("offer-made", {
      offer: data.offer,
      socket: socket.id,
    });
  });

  socket.on("make-answer", (data) => {
    socket.to(data.to).emit("answer-made", {
      socket: socket.id,
      answer: data.answer,
    });
  });

  socket.on("candidate", (id, message) => {
    socket.to(id).emit("candidate", socket.id, message);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter(
      (existingSocket) => existingSocket !== socket.id
    );

    socket.broadcast.emit("remove-user", {
      id: socket.id,
    });
  });
};
