import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { Card } from '../../model/Card';


const initialState: Card = {
    id: -1,
    name: '',
    last_numbers: '',
    month: '',
    year: '',
    verified: false,
    active: false,
};

export const cardSlice = createSlice({
    name: 'currentCard',
    initialState: initialState,
    reducers: {
        setCard: (state, action: PayloadAction<Card>) => {
            state.id = action.payload.id;         
            state.last_numbers = action.payload.last_numbers;         
            state.name = action.payload.name;         
            state.month = action.payload.month;
            state.year =  action.payload.year;         
            state.active = action.payload.active;
            state.verified = action.payload.verified;         
        },
        clearCard: (state) => {
           state.id = initialState.id;
           state.last_numbers = initialState.last_numbers;
           state.name = initialState.name;
           state.month = initialState.month;
           state.year = initialState.year;
           state.active = initialState.active;
           state.verified = initialState.verified;
           
        }
    },
  });

  export const { setCard, clearCard } = cardSlice.actions;

  export default cardSlice.reducer;