import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLogin: false,
    },
    reducers: {
        login: (state, action) => {
            localStorage.setItem("user", action.payload)
            const userData = action.payload
            state.isLogin = true;
            state.username = userData.username
        },
        logout: (state, action) => {
            state.isLogin = false;
            state.username = "";
        }
    }
})
export const { login, logout } = userSlice.actions;

export default userSlice;