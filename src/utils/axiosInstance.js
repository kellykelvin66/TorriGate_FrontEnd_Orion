import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://torr-gate-backendmain-kev.onrender.com/api",
});
