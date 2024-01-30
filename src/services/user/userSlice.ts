import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserProfile } from '../../model/User';
import { persistConfig } from '../../utils/store';
import { BillInfo } from '../../model/BillInfo';

type OrderUserBillingTemp = {
    billingInfo?: BillInfo,
}

type OrderUserPhoneTemp = {
    phoneNumber?: string;
}

type UserProfileProp = {
    userData: UserProfile,
    orderUserBillingTemp? : OrderUserBillingTemp
    orderUserPhoneTemp? : OrderUserPhoneTemp
}

const initialState: UserProfileProp = {
    userData: {},
    orderUserBillingTemp: { billingInfo : {} as BillInfo},
    orderUserPhoneTemp: {} as OrderUserPhoneTemp,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProfile>) => {
            state.userData = { ...action.payload};
        },
        setOrderUserBillingTemp: (state, action: PayloadAction<OrderUserBillingTemp>) => {
            state.orderUserBillingTemp = { ...action.payload};
        },
        setOrderUserPhoneTemp: (state, action: PayloadAction<OrderUserPhoneTemp>) => {
            state.orderUserPhoneTemp = { ...action.payload};
        },
        clearUserData: (state) => {
            state.userData = initialState.userData;         
        },
        clearOrderUserBillingTemp: (state) => {
             state.orderUserBillingTemp = initialState.orderUserBillingTemp;
         
        },
        clearOrderUserPhoneTemp: (state) => {
            state.orderUserPhoneTemp = initialState.orderUserPhoneTemp;      
        },
    },
  });

  export const { setUser, setOrderUserBillingTemp, setOrderUserPhoneTemp, clearUserData, clearOrderUserBillingTemp, clearOrderUserPhoneTemp} = userSlice.actions;

  export default userSlice.reducer;