import { api } from "@/utils/api";
export const ProductAPI = {
    categories: (limit?: number) => api.get(`/products/categories${limit ? `?limit=${limit}` : ""}`),
    products: (filter?: Filter) => {
        const query = new URLSearchParams()
        let url = `/products`
        if (filter) {
            if (filter.search) {
                query.append("q", filter.search)
                url = `${url}/search`
            }
            if (filter.sort) {
                query.append("sortBy", "title")
                query.append("order", filter.sort)
            }

            if (filter.skip || filter.skip == 0) {
                query.append("skip", filter.skip.toString())
                query.append("limit", "4")
            }

        }

        return api.get(`${url}?${query.toString()}`)
    }
}