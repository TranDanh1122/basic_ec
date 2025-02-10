import { deleteError, loginThunk, logout, userThunk } from "@/redux/slicers/authSlicer";
import { AppDispatch, AppState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
export const useAuth = () => {
    const dispatch: AppDispatch = useDispatch()
    const { accessToken, loading, user, error } = useSelector((state: AppState) => state.auth)
    return { dispatch, accessToken, loading, user, error, loginThunk, userThunk, logout, deleteError }
}