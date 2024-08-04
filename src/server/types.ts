import mongoose from "mongoose";

export interface IUser {
  username: string;
  passwordHash: string;
  tills: mongoose.Schema.Types.ObjectId[];
}

export interface ITill {
  tillNumber: number;
  tillTotal: number;
  user: mongoose.Schema.Types.ObjectId;
  additionalInfo?: string;
}
