import axios from "axios";
const baseUrl = "/api/till";
import { TillObjectWithDate } from "@/types";

let token: string = "";

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const config = () => {
  return {
    headers: { Authorization: token },
  };
};

const create = async (newObject: TillObjectWithDate) => {
  const response = await axios.post(baseUrl, newObject, config());

  return response.data;
};

export default { create };
