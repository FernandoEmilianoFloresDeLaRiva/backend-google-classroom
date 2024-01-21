import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyJWT = (req, res, next) => {
  let token = req.get("Authorization");
  if (token) {
    token = token.substring(7);
    jwt.verify(token, process.env.JWTSECRET, (err, decodeToken) => {
      if (err) {
        return res.status(401).send({
          message: "Token invalido",
          error: err.message,
        });
      }
      next();
    });
  }
  if (!token) {
    return res.status(401).send({ message: "Token inexistente" });
  }
};
