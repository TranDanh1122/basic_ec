import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const local = localStorage.getItem("cart")
const initState = local ? JSON.parse(local) : {
    cart: [],
    total: 0
}
const cartSlicer = createSlice({
    name: "redux/cart",
    initialState: initState,
    reducers: {
        addOrUpdateItem: (state: Cart, action: PayloadAction<Partial<CartItem>>) => {
            const item = action.payload
            const index = state.cart.findIndex(el => el.pro_id == item.pro_id)
            if (index != -1) {
                state.cart = state.cart.map(el => {
                    if (el.pro_id == item.pro_id) return { ...el, ...item }
                    return el
                })
                return
            }
            state.cart.push(item as CartItem)
            state.cart.filter(el => el.qty > 0)
            state.cart.forEach(el => { el.subtotal = el.price * el.qty })
            state.total = state.cart.reduce((sum, current) => {
                return sum + current.subtotal
            }, 0)
            localStorage.setItem("cart", JSON.stringify(state))
        },
        deleteItem: (state: Cart, action: PayloadAction<number>) => {
            const pro_id = action.payload
            state.cart = state.cart.filter(el => el.pro_id != pro_id)
            localStorage.setItem("cart", JSON.stringify(state))
        },
        clearCart: (state: Cart) => {
            state.cart = []
            state.total = 0
            localStorage.setItem("cart", JSON.stringify(state))
        }
    }
})
export default cartSlicer.reducer
export const { addOrUpdateItem, deleteItem, clearCart } = cartSlicer.actions