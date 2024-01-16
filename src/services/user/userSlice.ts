import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserProfile } from '../../model/User';
import { persistConfig } from '../../utils/store';
import { BillInfo } from '../../model/BillInfo';

type OrderUserDataTemp = {
    billingInfo?: BillInfo,
    phoneNumber?: string;
}

type UserProfileProp = {
    userData: UserProfile,
    orderUserDataTemp? : OrderUserDataTemp
}

const initialState: UserProfileProp = {
    userData: {},
    orderUserDataTemp: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProfile>) => {
            state.userData = { ...action.payload};
        },
        setOrderUserDataTemp: (state, action: PayloadAction<OrderUserDataTemp>) => {
            state.orderUserDataTemp = { ...action.payload};
        },
        clearUserData: (state) => {
            state.userData = initialState.userData;
            persistConfig.storage.removeItem('persist:root')
        },
        clearOrderUserDataTemp: (state) => {
            state.orderUserDataTemp = initialState.orderUserDataTemp;
            persistConfig.storage.removeItem('persist:root')
        },
    },
  });

  export const { setUser, setOrderUserDataTemp, clearUserData, clearOrderUserDataTemp } = userSlice.actions;

  export default userSlice.reducer;