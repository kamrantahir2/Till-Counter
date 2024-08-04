import express from "express";
const usersRouter = express.Router();
import usersService from "../serverServices/users";

usersRouter.get("/", async (_request, response) => {
  const data = await usersService.getAllUsers();

  response.send(data);
});

usersRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const createdUser = await usersService.createUser({ username, password });

  response.send(createdUser);
});

export default usersRouter;
