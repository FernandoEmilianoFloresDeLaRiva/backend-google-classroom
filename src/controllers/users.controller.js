import * as userService from "../services/users.service.js";

export const getAllUserController = async (req, res) => {
  try {
    const response = await userService.getAllUsersService();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getUserByEmailController = async (req, res) => {
  try {
    const { email } = req.params;
    const response = await userService.getUserByEmailService(email);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const createUserController = async (req, res) => {
  try {
    const response = await userService.createUserService(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const response = await userService.loginUserService(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
