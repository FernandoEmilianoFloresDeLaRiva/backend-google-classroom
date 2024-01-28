import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWTSECRET || "Transaccionalidad";

export const verifyJWT = (req, res, next) => {
  let token = req.get("Authorization");
  if (token) {
    token = token.substring(7);
    jwt.verify(token, secret, (err, decodeToken) => {
      if (err) {
        console.log("no paso");
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
