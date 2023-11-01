import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

type categoryProp = {
    categoryId: string,
    categoryName: string
}

const initialState: categoryProp = {
    categoryId: '',
    categoryName: '',
};

export const categorySlice = createSlice({
    name: 'categoryBranchDetail',
    initialState: initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<categoryProp>) => {
            state.categoryId = action.payload.categoryId,
            state.categoryName = action.payload.categoryName
        },
        clearCategorySelected: (state) => {
            state.categoryId = '';
            state.categoryName = '';
        },
    },
  });

  export const { setCategory, clearCategorySelected } = categorySlice.actions;

  export default categorySlice.reducer;