import Till from "../models/till";
import User from "../models/user";
import jwt, { decode } from "jsonwebtoken";
import { Request, Response } from "express";
import { CreatedTill, ITill, IJwtPayload } from "../types";
import dotenv from "dotenv";
dotenv.config();

const getTokenFrom = (request: Request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    return token;
  }
  return "no token";
};

const getAllTills = async () => {
  const data = await Till.find({});

  return data;
};

const tillTypeChecking = (till: any): till is ITill => {
  if (
    "tillTotal" in till &&
    "tillNumber" in till &&
    "date" in till &&
    "user" in till
  ) {
    return true;
  } else {
    return false;
  }
};

const createTill = async (till: ITill, request: Request) => {
  if (typeof process.env.SECRET !== "string") {
    throw new Error("invalid secret");
  }

  const decodedToken = jwt.verify(
    getTokenFrom(request),
    process.env.SECRET
  ) as IJwtPayload;

  if (!decodedToken) {
    throw new Error("token invalid");
  }

  console.log(tillTypeChecking(till));

  const user = await User.findById(decodedToken.id);

  return user;
};

export default { getAllTills, createTill };
