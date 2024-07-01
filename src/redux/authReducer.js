import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    login: {
        currentUser: null,
        logged: false,
    }
}
const authReducer = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        loginSuccess: (state, action)=>{
            state.login.currentUser = action.payload;
            state.login.logged = true;
        },
        loggedOut: (state)=>{
            state.login.currentUser = null;
            state.login.logged = false;
        },
    }
});

export const {loginSuccess, loggedOut} = authReducer.actions;
export default authReducer.reducer;