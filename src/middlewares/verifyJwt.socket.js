export const verifyJWTSocket = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    jwt.verify(token, secretJWT, (err, decode) => {
      if (err) {
        next(err);
      }

      socket.user = decode;
      next();
    });
  } catch (error) {
    next(error);
  }
};
