import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const jwtToken = process.env.JWTSECRET || "1234"


export const createJWT = (user) => {
  const { email, name } = user;
  const payload = {
    usuario: {
      name: name,
      email: email,
    },
  };
  const token = jwt.sign(payload, jwtToken, { expiresIn: "1h" });
  console.log(token)
  return token;
};
