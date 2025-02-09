import { configureStore } from "@reduxjs/toolkit";
import AuthSlicer from './slicers/authSlicer'
import CartSlicer from "./slicers/cartSlicer"
export const store = configureStore({
    reducer: {
        auth: AuthSlicer,
        cart: CartSlicer
    }
})
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch