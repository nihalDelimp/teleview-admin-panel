import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    user : {}
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.token = action.payload;
        },
        saveUser: (state, action) => {
            state.user = action.payload;
        },
       
        logout: (state, action) => {
            state.user = {};
            state.token = "";
            localStorage.removeItem('token')
        },
    },
});

export const { setAccessToken, saveUser , logout } = authSlice.actions;

export default authSlice.reducer;