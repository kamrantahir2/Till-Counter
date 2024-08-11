import User from "../models/user";
import { CreatedUser, Credentials } from "../types";
import bcrypt from "bcrypt";

const getAllUsers = async (): Promise<CreatedUser[]> => {
  const response = await User.find({});
  return response;
};

const getUserById = async (id: string): Promise<CreatedUser> => {
  const user = await User.findById(id).populate("tills", {
    id: 1,
    tillNumber: 1,
    tillTotal: 1,
    date: 1,
    additionalInfo: 1,
  });
  if (user === null) {
    throw new Error("user not found");
  }
  return user;
};

const createUser = async (newUser: Credentials): Promise<CreatedUser> => {
  const { username, password } = newUser;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  return savedUser;
};

export default { getAllUsers, createUser, getUserById };
