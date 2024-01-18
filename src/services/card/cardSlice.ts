import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { Card } from '../../model/Card';

type CurrentCard = {
    card: Card;
    cardConfirmAdded: Card;
}

const initialState: CurrentCard = {
    card: {
        id: -1,
        name: '',
        last_numbers: '',
        month: '',
        year: '',
        verified: false,
        active: false,
    },
    cardConfirmAdded: {
        id: -1,
        name: '',
        last_numbers: '',
        month: '',
        year: '',
        verified: false,
        active: false,
    }
};

export const cardSlice = createSlice({
    name: 'currentCard',
    initialState: initialState,
    reducers: {
        setCard: (state, action: PayloadAction<Card>) => {         
            state.card = action.payload       
        },
        setCardConfirmAdded: (state, action: PayloadAction<Card>) => {
            state.cardConfirmAdded = action.payload        
        },
        clearCard: (state) => {     
            state.card = initialState.card
        },
        clearCardConfirmAdded: (state) => {
            state.cardConfirmAdded = initialState.card
        }
    },
  });

  export const { setCard, setCardConfirmAdded, clearCard, clearCardConfirmAdded } = cardSlice.actions;

  export default cardSlice.reducer;