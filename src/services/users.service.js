import * as userRepository from "../repositories/users.repository.js";
import { createJWT } from "../utils/createJWT.js";
import bcrypt from "bcrypt";

export const getAllUsersService = async () => {
  try {
    const response = await userRepository.getAllUsers();
    return response;
  } catch (err) {
    throw err;
  }
};

export const getUserByEmailService = async (email) => {
  try {
    const response = await userRepository.getUserByEmail(email);
    return response;
  } catch (err) {
    throw err;
  }
};

export const createUserService = async (userReq) => {
  try {
    const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT) || 10;
    const { name, email } = userReq;
    const passwordHash = bcrypt.hashSync(userReq.password, saltosBcrypt);
    const response = await userRepository.createUser(name, email, passwordHash);
    const jwt = createJWT(response);
    return jwt;
  } catch (err) {
    throw err;
  }
};

export const loginUserService = async (userReq) => {
  try {
    const { email, password } = userReq;
    const originalUser = await userRepository.getUserByEmail(email);
    if (originalUser) {
      const correctPassword = bcrypt.compareSync(
        password,
        originalUser.password
      );
      if (correctPassword) {
        const jwt = createJWT(originalUser);
        return {
          token: jwt,
          user: originalUser,
        };
      }
    }
    throw new Error("Credecianles invalidas")
  } catch (err) {
    throw err;
  }
};
