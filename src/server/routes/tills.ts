import express from "express";
import tillService from "../serverServices/till";
import { ITill } from "../types";
const tillRouter = express.Router();

tillRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const result = await tillService.createTill(body, req);

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export default tillRouter;
