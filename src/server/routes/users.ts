import express from "express";
const usersRouter = express.Router();
import usersService from "../serverServices/users";

usersRouter.get("/", async (_request, response) => {
  const data = await usersService.getAllUsers();

  response.send(data);
});

export default usersRouter;
