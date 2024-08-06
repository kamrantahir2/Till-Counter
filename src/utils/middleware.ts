import { Request, Response, NextFunction } from "express";

const errorHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error instanceof Error) {
    console.log(error.name);
    if (error.name === "CastError") {
      return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
      return response.status(400).json({ error: "Validation error" });
    } else if (
      error.name === "MongoServerError" &&
      error.message.includes("E11000 duplicate key error")
    ) {
      return response.json(400).json({ error: "Username is not available" });
    } else if (error.name === "JsonWebTokenError") {
      return response.status(401).json({ error: "token invalid" });
    } else if (error.name === "TokenExpiredError") {
      return response.status(401).json({ error: "Token Expired" });
    } else if (error.name === "invalid secret") {
      return response.status(500).json({ error: "invalid secret" });
    } else if (error.name === "token invalid") {
      return response.status(401).json({ error: "token invalid" });
    } else {
      return response.status(500).json({ error: error });
    }
  }
};

const unknownEndpoint = (_request: Request, response: Response) => {
  return response.status(404).send({ message: "unknown endpoint" });
};

export default { errorHandler, unknownEndpoint };
