import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { persistConfig } from '../../utils/store'

type AuthToken = {
    token: string;
}

const initialState: AuthToken = {
    token: '',
};

export const authSlice = createSlice({
    name: 'token',
    initialState: initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        clearToken: (state) => {
            state.token = '';
        }
    },
  });

  export const { setToken, clearToken } = authSlice.actions;

  export default authSlice.reducer;
