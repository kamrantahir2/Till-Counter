import User from "../models/user";
import { CreatedUser, Credentials } from "../../types";
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
    expectedTotal: 1,
    expectedVsTotal: 1,
    date: 1,
    additionalInfo: 1,
  });

  if (user === null) {
    throw new Error("user not found");
  }
  return user;
};

const createUser = async (newUser: Credentials): Promise<CreatedUser> => {
  try {
    const password = newUser.password;
    const username = newUser.username.toLowerCase();
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      passwordHash,
    });

    const savedUser = await user.save();

    return savedUser;
  } catch (error) {
    throw new Error("Username already in use");
  }
};

export default { getAllUsers, createUser, getUserById };
