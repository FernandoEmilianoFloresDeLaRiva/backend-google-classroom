import jwt from "jsonwebtoken";

export const createJWT = (user) => {
  const { idUser, name } = user;
  const payload = {
    usuario: {
      id: idUser,
      name: name,
    },
  };
  const token = jwt.sign(payload, jwtToken, { expiresIn: "1h" });
  return token;
};
