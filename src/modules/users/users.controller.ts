import { RequestHandler } from "express";
import { userService } from "./users.server";

const register: RequestHandler = async (req, res) => {
  const payload = req.body;

  const user = await userService.register(payload);
  console.log(user)

  res.send({ message: "Registered Successfully", data: user });
};

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const token = await userService.login(email, password);

  res.send({ message: "Logged in successfully", token });
};

export const userController = {
  register,
  login,
};