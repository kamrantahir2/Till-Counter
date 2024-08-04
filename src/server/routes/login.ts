import express from "express";
const loginRouter = express.Router();
import loginService from "../serverServices/login";

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  const result = await loginService.login({ username, password });

  response.status(200).send(result);
});

export default loginRouter;
