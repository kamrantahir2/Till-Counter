import Till from "../models/till";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { CreatedTill } from "../types";

const getTokenFrom = (request: Request) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    return token;
  }
  return null;
};

const getAllTills = async () => {
  const data = await Till.find({});

  return data;
};
