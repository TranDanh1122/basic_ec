import axios from "axios"
import { store } from "@/redux/store";
import { refreshThunk } from "@/redux/slicers/authSlicer";
export const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 5000
})
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("danh_accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            store.dispatch(refreshThunk() as any);
        }
        return Promise.reject(error);
    }
);