export const disconnectHandler = (io, socket) => {
  socket.on("disconnect", () => {
    console.log("cliente desconectado: ");
  });
};
