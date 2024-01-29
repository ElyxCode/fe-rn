import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { persistConfig } from '../../utils/store';
import { Address } from '../../model/Address';

type AddressSliceProp = {
    address: Address 
}

const initialState: AddressSliceProp = {
    address: {} as Address
};

export const addressSlice = createSlice({
    name: 'address',
    initialState: initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<Address>) => {
            state.address = { ...action.payload};
        },
        clearAddress: (state) => {
            state.address = initialState.address;         
        },
    },
  });

  export const { setAddress, clearAddress } = addressSlice.actions;

  export default addressSlice.reducer;