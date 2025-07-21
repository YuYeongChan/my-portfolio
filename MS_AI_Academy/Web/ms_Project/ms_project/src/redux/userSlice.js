import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: "",
    token: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.userId = "";
            state.token = "";
        },
    },
});

export const { setLogin, logout } = userSlice.actions;
export default userSlice.reducer;
