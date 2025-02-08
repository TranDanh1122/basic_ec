import { api } from "@/utils/api";
export const ProductAPI = {
    categories: (limit?: number) => api.get(`/products/categories${limit ? `?limit=${limit}` : ""}`),
    products: () => api.get(`/products`)
}