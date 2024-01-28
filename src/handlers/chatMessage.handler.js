export const chatMessageHandler = (io, socket) => {
  socket.on("chatMessage", (subjectId, data) => {
    console.log(data)
    io.to(subjectId).emit("messageReceived", data);
  });
};
