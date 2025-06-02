import axios from "axios";
const baseUrl = "/api/till";
import { TillObjectWithDate, TillObject, PopulatedTill } from "@/types";
import { currentDate } from "../utils/utils";

let token: string = "";

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const config = () => {
  return {
    headers: { Authorization: token },
  };
};

const create = async (newObject: TillObject) => {
  const tillWithDate: TillObjectWithDate = {
    ...newObject,
    date: currentDate,
  };

  const response = await axios.post(baseUrl, tillWithDate, config());

  return response.data;
};

const getAll = async (username: string | undefined) => {
  const response = await axios.get(baseUrl);
  const data = response.data;

  const filtered = data.filter(
    (till: PopulatedTill) => till.user.username === username
  );

  return filtered;
};

const verifyToken = async () => {
  try {
    const response = await axios.post("/api/users/verify", { token: token });

    return response.status;
  } catch (error: any) {
    return error.response;
  }
};

export default { create, setToken, getAll, verifyToken };
