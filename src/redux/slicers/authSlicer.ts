import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthAPI from "@/api/AuthAPI";
const accessToken = localStorage.getItem("danh_accessToken")
const refreshToken = localStorage.getItem("danh_refreshToken")
interface AuthState {
    user: User,
    accessToken: string,
    refreshToken: string,
    loading: boolean
    error: string
}
const initState: AuthState = {
    user: {} as User,
    accessToken: accessToken ?? "",
    refreshToken: refreshToken ?? "",
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
export const refreshThunk = createAsyncThunk("redux/refresh-thunk", async (_, { rejectWithValue }) => {
    try {
        const response = await AuthAPI.refresh(localStorage.getItem("ref_token") ?? "")
        return response.data
    } catch (error) {
        return rejectWithValue("Error" + error)
    }
})
const authSlicer = createSlice({
    name: "redux/auth",
    initialState: initState,
    reducers: {
        logout: (state: AuthState) => {
            state.user = {} as User
            state.accessToken = ""
            state.refreshToken = ""
            localStorage.setItem("danh_accessToken", "")
            localStorage.setItem("danh_refreshToken", "")
        },
        deleteError: (state: AuthState) => {
            state.error = ""
        }
    },
    extraReducers: (builders) => {
        builders.addCase(loginThunk.pending, (state: AuthState) => {
            state.loading = true
        }).addCase(loginThunk.fulfilled, (state: AuthState, action: PayloadAction<User & { accessToken: string, refreshToken: string }>) => {
            state.loading = false
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            console.log(2);
            localStorage.setItem("danh_accessToken", action.payload.accessToken)
            localStorage.setItem("danh_refreshToken", action.payload.refreshToken)
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
        }).addCase(refreshThunk.pending, (state: AuthState) => {
            state.loading = true
        }).addCase(refreshThunk.fulfilled, (state: AuthState, action: PayloadAction<User & { accessToken: string, refreshToken: string }>) => {
            state.loading = false
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            console.log(1);
            localStorage.setItem("danh_accessToken", action.payload.accessToken)
            localStorage.setItem("danh_refreshToken", action.payload.refreshToken)
        }).addCase(refreshThunk.rejected, (state: AuthState, action: PayloadAction<unknown>) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
})
export const { logout, deleteError } = authSlicer.actions
export default authSlicer.reducer
