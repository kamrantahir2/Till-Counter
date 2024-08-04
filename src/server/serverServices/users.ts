// import { IUser } from "../types";
import User from "../models/user";
import { IUser } from "../types";

const getAllUsers = async (): Promise<IUser[]> => {
  const response = await User.find({});
  return response;
};

const createUser = async (): 

export default { getAllUsers };
