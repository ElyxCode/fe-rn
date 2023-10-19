import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../../utils/store'

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
        deleteToken: (state) => {
            state.token = '';
        }
    },
  });

  export const { setToken, deleteToken } = authSlice.actions;

  export default authSlice.reducer;
