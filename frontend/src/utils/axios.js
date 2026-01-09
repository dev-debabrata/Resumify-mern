import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url || "";

        // 🚫 Auth routes should NOT trigger logout
        const isAuthRoute =
            requestUrl.includes("/api/auth/login") ||
            requestUrl.includes("/api/auth/register");

        if (status === 401 && !isAuthRoute) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }

        if (status === 500) {
            console.error("Server error. Please try again later.");
        }

        if (error.code === "ECONNABORTED") {
            console.error("Request timeout. Please try again.");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
