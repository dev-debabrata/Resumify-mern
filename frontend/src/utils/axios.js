import axios from "axios";
import { BASE_URL } from "./apiPaths";

// Create Axios instance
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
    (error) => {
        return Promise.reject(error);
    }
);


// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Server responded with error
        if (error.response) {
            if (error.response.status === 401) {
                // Unauthorized → redirect to login
                localStorage.removeItem("token");
                window.location.href = "/";
            } else if (error.response.status === 500) {
                console.error("Server error. Please try again later.");
            }
        }
        // Request timeout
        else if (error.code === "ECONNABORTED") {
            console.error("Request timeout. Please try again.");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
