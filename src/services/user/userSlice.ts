import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserProfile } from '../../model/User';

// import type { RootState } from '../../utils/store'

type UserProfileProp = {
    userData: UserProfile 
}

const initialState: UserProfileProp = {
    userData: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProfile>) => {
            state.userData = action.payload;
        },
        
    },
  });

  export const { setUser } = userSlice.actions;

  export default userSlice.reducer;