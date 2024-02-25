import { createSlice } from "@reduxjs/toolkit";

interface authValue {
    userInfo: any;
}

const user: any = localStorage.getItem("userInfo")


const initialState: authValue = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(user) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        set_credential: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.userInfo = null
            localStorage.clear();
        }
    }
})

export const { set_credential, logout} = authSlice.actions;
export default authSlice.reducer;
