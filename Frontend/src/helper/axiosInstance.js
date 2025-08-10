import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.withCredentials=true
axiosInstance.defaults.baseURL=import.meta.env.VITE_SERVER_URL || "http://localhost:8080";
export default axiosInstance;