import axios from "axios";

export const AxiosWithOutAuthInstance = axios.create({
  baseURL: "https://dummy-1.hiublue.com/api",
});
