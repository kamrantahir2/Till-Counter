import axios from "axios";
const baseUrl = "/api/till";
import { TillObjectWithDate, TillObject } from "@/types";
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

export default { create, setToken };
