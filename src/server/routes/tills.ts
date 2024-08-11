import express from "express";
import tillService from "../serverServices/till";
const tillRouter = express.Router();

tillRouter.get("/", async (_request, response, next) => {
  try {
    const result = await tillService.getAllTills();
    response.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

tillRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const result = await tillService.createTill(body, req);

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

export default tillRouter;
