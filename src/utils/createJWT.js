import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWTSECRET || "Transaccionalidad";

export const createJWT = (user) => {
  const { email, name } = user;
  const payload = {
    usuario: {
      name: name,
      email: email,
    },
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  console.log(token);
  return token;
};
