import axios from "axios";
const baseUrl = "/api/users";
import { Credentials } from "../types";

const createUser = async (newUser: Credentials) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

export default { createUser };
