import { api } from "@/utils/api";
const AuthAPI = {
    login: (data: { username: string, password: string }) => api.post("/auth/login", data),
    getUser: () => api.get("/auth/me"),
    refresh: (refreshToken: string) => api.post("/auth/refresh", { refreshToken: refreshToken }),
}
export default AuthAPI