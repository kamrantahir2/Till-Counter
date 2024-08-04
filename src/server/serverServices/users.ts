import User from "../models/user";
import { CreatedUser, NewUser } from "../types";
import bcrypt from "bcrypt";

const getAllUsers = async (): Promise<CreatedUser[]> => {
  const response = await User.find({});
  return response;
};

const createUser = async (newUser: NewUser): Promise<CreatedUser> => {
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

export default { getAllUsers, createUser };
