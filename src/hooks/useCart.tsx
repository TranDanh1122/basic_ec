import { addOrUpdateItem, clearCart, deleteItem } from "@/redux/slicers/cartSlicer";
import { AppDispatch, AppState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
export const useCart = () => {
    const { cart, total } = useSelector((state: AppState) => state.cart)
    const length = React.useMemo(() => {
        return cart.length
    }, [cart])
    const dispatch = useDispatch<AppDispatch>()
    return { cart, dispatch, addOrUpdateItem, deleteItem, clearCart, length, total }
}