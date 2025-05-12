import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/Api";

export const sendLoginSignupOtp = createAsyncThunk("/auth/sendLoginSignupOtp",
    async ({ email }: { email: string }, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/sent/login-signup-otp", { email })
            console.log("login otp", response)
        } catch (error) {
            console.log("error...", error)
        }
    }
)

export const signin = createAsyncThunk<any, any>("/auth/signin",
    async (loginRequest, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/signin", loginRequest)
            console.log("login otp", response.data)
        } catch (error) {
            console.log("error...", error)
        }
    }
)

export const logout = createAsyncThunk<any, any>("/auth/logout",
    async (navigate, { rejectWithValue }) => {
        try {
            localStorage.clear()
            console.log("logged out successfully..")
            navigate("/")
        } catch (error) {
            console.log("error...", error)
        }
    }
)