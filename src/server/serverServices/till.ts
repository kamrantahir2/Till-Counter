import Till from "../models/till";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { CreatedTill, ITill, IJwtPayload } from "../types";
import dotenv from "dotenv";
import { ObjectId } from "mongoose";
dotenv.config();

const getTokenFrom = (request: Request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    return token;
  }
  return "no token";
};

const getAllTills = async (): Promise<CreatedTill[]> => {
  const data = await Till.find({});

  return data;
};

const getTillById = async (id: string): Promise<CreatedTill> => {
  const data = await Till.findById(id);

  if (data === null) {
    throw new Error("till not found");
  }

  return data;
};

const tillTypeChecking = (till: any): till is ITill => {
  if (
    "tillTotal" in till &&
    "tillNumber" in till &&
    "date" in till &&
    "user" in till &&
    "expectedTotal" in till
  ) {
    return true;
  } else {
    return false;
  }
};

const createTill = async (
  till: ITill,
  request: Request
): Promise<CreatedTill> => {
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

  if (!tillTypeChecking(till)) {
    throw new Error("missing fields");
  }

  const user = await User.findById(decodedToken.id);

  if (user === null) {
    throw new Error("user not found");
  }

  const createdTill: ITill = {
    tillNumber: till.tillNumber,
    tillTotal: till.tillTotal,
    expectedTotal: till.expectedTotal,
    date: till.date,
    user: user.id,
    additionalInfo: till.additionalInfo,
    expectedVsTotal: Number(till.expectedVsTotal.toFixed(2)),
  };

  const newTill = new Till(createdTill);

  const savedTill = await newTill.save();

  const tillId = savedTill._id as unknown as ObjectId;

  user.tills = user.tills.concat(tillId);

  await user.save();

  return savedTill;
};

export default { getAllTills, createTill, getTillById };
