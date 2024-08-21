import mongoose from "mongoose";
import { JwtPayload } from "jsonwebtoken";

export interface IUser {
  username: string;
  passwordHash: string;
  tills: mongoose.Schema.Types.ObjectId[];
}

export interface IJwtPayload extends JwtPayload {
  id: string;
}

export interface ITill {
  tillNumber: number;
  tillTotal: number;
  expectedTotal: number;
  expectedVsTotal: string;
  date: string;
  user: mongoose.Schema.Types.ObjectId;
  additionalInfo?: string;
}

export interface Till {
  date: string;
  expectedTotal: number;
  expectedVsTotal: string;
  id: string;
  tillNumber: number;
  tillTotal: number;
}

export interface User {
  id: string;
  tills: Till[];
  token: string;
  username: string;
}

export type TillObject = Omit<ITill, "user" | "date">;

export type TillObjectWithDate = Omit<ITill, "user">;

export interface CreatedUser extends IUser {
  id?: mongoose.Schema.Types.ObjectId;
}

export interface CreatedTill extends ITill {
  id?: mongoose.Schema.Types.ObjectId;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface LoggedInUser {
  token: string;
  username: string;
  id: string;
  tills: mongoose.Schema.Types.ObjectId[];
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
