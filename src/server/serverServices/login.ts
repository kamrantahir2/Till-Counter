import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import dotenv from "dotenv";
dotenv.config();
import { LoggedInUser, Credentials } from "../../types";

const login = async (credentials: Credentials): Promise<LoggedInUser> => {
  const { username, password } = credentials;

  const user = await User.findOne({ username }).populate("tills", {
    id: 1,
    tillNumber: 1,
    tillTotal: 1,
    expectedTotal: 1,
    expectedVsTotal: 1,
    date: 1,
    additionalInfo: 1,
  });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    throw new Error("invalid username or password");
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  if (typeof process.env.SECRET !== "string") {
    throw new Error("invalid secret");
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  const loggedInUser: LoggedInUser = {
    token,
    username: user.username,
    id: user._id.toString(),
    tills: user.tills,
  };

  return loggedInUser;
};

export default { login };
