import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    token: string | null;
    username: string | null;
    userId: string | null;
}

const initialState: AuthState = {
    token: null,
    username: null,
    userId: null,
};

export const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<{ token: string; username: string; userid: string }>) {
            state.token = action.payload.token
            state.username = action.payload.username
            state.userId = action.payload.userid
            console.log(JSON.parse(JSON.stringify(state)))
        },
        logout(state) {
            console.log(JSON.parse(JSON.stringify(state)))
            return initialState
        },
    },
})

export const { loginSuccess, logout } = authSlice.actions

export default authSlice.reducer