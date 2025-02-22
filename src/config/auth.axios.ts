import axios from "axios";

const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};
export const AxiosAuthInstance = axios.create({
  baseURL: "https://dummy-1.hiublue.com/api",
  headers,
});
