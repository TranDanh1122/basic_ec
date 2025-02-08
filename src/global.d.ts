declare global {
    interface CartItem {
        pro_id: string,
        name: string,
        image: string,
        price: number,
        qty: number,
        subtotal: number
    }
    interface Cart {
        cart: CartItem[],
        total: number
    }
    interface User {
        id: number,
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        gender: string,
        image: string,
    }
    interface Category {
        name: string,
        slug: string,
        url: string
    }
}
export { }