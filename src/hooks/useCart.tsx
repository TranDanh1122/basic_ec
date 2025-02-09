import { addOrUpdateItem, clearCart, deleteItem } from "@/redux/slicers/cartSlicer";
import { AppDispatch, AppState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
export const useCart = () => {
    const { cart } = useSelector((state: AppState) => state.cart)
    const dispatch = useDispatch<AppDispatch>()
    return {cart , dispatch , addOrUpdateItem , deleteItem, clearCart}
}