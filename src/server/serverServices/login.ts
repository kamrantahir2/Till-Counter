import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import dotenv from "dotenv";
dotenv.config();
import { LoggedInUser, Credentials } from "../../types";

const getTokenFrom = (token: string) => {
  if (token.startsWith("Bearer ")) {
    const newToken = token.replace("Bearer ", "");
    return newToken;
  }
  return "no token";
};

const login = async (credentials: Credentials): Promise<LoggedInUser> => {
  const username = credentials.username.toLowerCase();
  const password = credentials.password;

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

const verifyToken = (token: string) => {
  let verified = false;

  jwt.verify(getTokenFrom(token), process.env.SECRET as string, (err) => {
    if (err) {
      console.log(err.name);
      verified = false;
    } else {
      verified = true;
    }
  });

  return verified;
};

export default { login, verifyToken };
