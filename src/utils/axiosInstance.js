import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://torri-gate-isaac.onrender.com/api",
});
