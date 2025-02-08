import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthAPI from "@/api/AuthAPI";
const local = localStorage.getItem("token")
interface AuthState {
    user: User,
    token: string,
    loading: boolean
    error: string
}
const initState: AuthState = {
    user: {} as User,
    token: local ?? "",
    loading: false,
    error: ""
}
export const loginThunk = createAsyncThunk("redux/login-thunk", async (data: { username: string, password: string }, { rejectWithValue }) => {
    try {
        const response = await AuthAPI.login(data)
        return response.data
    } catch (error) {
        return rejectWithValue("Error" + error)
    }
})
export const userThunk = createAsyncThunk("redux/user-thunk", async (_, { rejectWithValue }) => {
    try {
        const response = await AuthAPI.getUser()
        return response.data
    } catch (error) {
        return rejectWithValue("Error" + error)
    }
})
const authSlicer = createSlice({
    name: "redux/auth",
    initialState: initState,
    reducers: {

    },
    extraReducers: (builders) => {
        builders.addCase(loginThunk.pending, (state: AuthState) => {
            state.loading = true
        }).addCase(loginThunk.fulfilled, (state: AuthState, action: PayloadAction<string>) => {
            state.loading = false
            state.token = action.payload
            localStorage.setItem("token", action.payload)
        }).addCase(loginThunk.rejected, (state: AuthState, action: PayloadAction<unknown>) => {
            state.loading = false
            state.error = action.payload as string
        }).addCase(userThunk.pending, (state: AuthState) => {
            state.loading = true
        }).addCase(userThunk.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
            state.loading = false
            state.user = action.payload
        }).addCase(userThunk.rejected, (state: AuthState, action: PayloadAction<unknown>) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
})
export default authSlicer.reducer
