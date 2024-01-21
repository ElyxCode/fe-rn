import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { persistConfig } from '../../utils/store'

export const thirdPartySocial = {
    google: 'google',
    apple: 'apple'
}

type AuthToken = {
    token: string;
    fcmToken?: string;
    social?: string;
}

const initialState: AuthToken = {
    token: '',
    fcmToken: '',
    social: ''
};

export const authSlice = createSlice({
    name: 'token',
    initialState: initialState,
    reducers: {
        setToken: (state, action: PayloadAction<AuthToken>) => {
            state.token = action.payload.token,         
            state.fcmToken = action.payload.fcmToken,         
            state.social = action.payload.social ?? initialState.social
        },
        clearToken: (state) => {
           state.token = initialState.token;
           state.fcmToken = initialState.fcmToken, 
           state.social = initialState.social;
        }
    },
  });

  export const { setToken, clearToken } = authSlice.actions;

  export default authSlice.reducer;
