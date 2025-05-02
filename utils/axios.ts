import axios from "axios";
import { getCookieToken } from "./cookie";

const AI_api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_AI_URL || "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    }
});

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    }
});

api.interceptors.request.use(
    (config) => {
        const token = getCookieToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
);

export { api, AI_api };