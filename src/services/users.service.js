import * as userRepository from "../repositories/users.repository.js";
import { createJWT } from "../utils/createJWT.js";
import bcrypt from "bcrypt";

export const getAllUsersService = async () => {
  try {
    const response = await userRepository.getAllUsers();
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const getUserByEmailService = async ({ email }) => {
  try {
    const response = await userRepository.getUserByEmail(email);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const createUserService = async (userReq) => {
  try {
    const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT) || 10;
    const { name, email } = userReq;
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser.length) {
      throw new Error("Email existente");
    }
    const passwordHash = bcrypt.hashSync(userReq.password, saltosBcrypt);
    const response = await userRepository.createUser(name, email, passwordHash);
    const jwt = createJWT(response);
    return {
      id: response.id,
      name,
      token: jwt,
    };
  } catch (err) {
    throw new Error(err);
  }
};

export const loginUserService = async (userReq) => {
  try {
    const { email, password } = userReq;
    const originalUser = await userRepository.getUserByEmail(email);
    console.log(originalUser[0]);
    if (originalUser.length) {
      const correctPassword = bcrypt.compareSync(
        password,
        originalUser[0].password
      );
      if (correctPassword) {
        const jwt = createJWT(originalUser[0]);
        return {
          token: jwt,
          id: originalUser[0].idUser,
          name: originalUser[0].name,
        };
      }
    }
    throw new Error("Credenciales invalidas");
  } catch (err) {
    throw new Error(err);
  }
};
