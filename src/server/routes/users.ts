import express from "express";
const usersRouter = express.Router();
import usersService from "../serverServices/users";
import loginService from "../serverServices/login";

usersRouter.get("/", async (_request, response, next) => {
  try {
    const data = await usersService.getAllUsers();

    response.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const result = await usersService.getUserById(id);

    response.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, password } = request.body;

    const createdUser = await usersService.createUser({ username, password });
    response.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/verify", async (request, response, next) => {
  try {
    const { token } = request.body;

    if (!loginService.verifyToken(token)) {
      response.sendStatus(403);
    } else {
      response.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
