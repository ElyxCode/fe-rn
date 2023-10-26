import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Location} from '../../model/Location'

type locationProp={
    currentLocation: Location
}

const initialState: locationProp = {
    currentLocation: {latitude:0, longitude:0}
};

export const locationSlice = createSlice({
name:'currentLocation',
initialState: initialState,
reducers:{
    setCurrentLocationGlobal: (state, action:PayloadAction<Location>) => {
       state.currentLocation = {...action.payload}
    }
}

})

export const { setCurrentLocationGlobal } = locationSlice.actions;

export default locationSlice.reducer;