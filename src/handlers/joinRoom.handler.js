export const joinRoomHandler = (io, socket) => {
  socket.on("joinRoom", (subjectId) => {
    socket.join(subjectId);
    console.log(`Usuario ${socket.id} se unió a la sala ${subjectId}`);
  });
};
