import axios from "axios";
const baseUrl = "/api/login";
import { Credentials } from "../types";
import tillService from "../service/tills";

const login = async (credentials: Credentials) => {
  const response = await axios.post(baseUrl, credentials);

  tillService.setToken(response.data.token);

  return response.data;
};

export default { login };
