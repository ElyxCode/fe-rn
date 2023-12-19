import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { persistConfig } from '../../utils/store';
import { Product } from '../../model/product';

type Cart = {
    products: Product[],
    totalValue: number
}

type ProductCart = {
    product: Product,
    itemAmount: number
}

const initialState: Cart = {
    products: [],
    totalValue: 0
}

export const productSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<ProductCart>) => {
            let sameProduct = state.products.find(product => product.id === action.payload.product.id);
            if(sameProduct){
               state.products = [...state.products.filter(prod => {
                if(prod.id === action.payload.product.id){
                    prod.quantity = prod.quantity + action.payload.itemAmount
               }
               return prod;
            })]
            }else{
                state.products = [...state.products,  {...action.payload.product, quantity: action.payload.itemAmount}];
            }
            
            calculateTotalAmount(state);
        },
        incrementProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.map(item => {
                if(item.id === action.payload){
                    item.quantity = item.quantity + 1;
                }
                return item
            })
            calculateTotalAmount(state);
        },
        decrementProduct : (state, action: PayloadAction<number>) => {
            let product = state.products.find(item => item.id === action.payload);
            if(product?.quantity  !== undefined && product?.quantity <= 1){
               state.products = state.products.filter(item => item.id !== product?.id);
            }else{
                state.products = state.products.map(item => {
                    if(item.id === action.payload){
                        item.quantity = item.quantity - 1;
                    }
                    return item
                })
            }
            
            calculateTotalAmount(state);
        },
        setProductAmount: (state, action: PayloadAction<ProductCart>) => {
            state.products.filter(prod => {
                if(prod.id === action.payload.product.id){
                    return prod.quantity = action.payload.itemAmount
               }});
            
            calculateTotalAmount(state);
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
            calculateTotalAmount(state);
        },
        clearProduct: (state) => {
            state = initialState;
            persistConfig.storage.removeItem('persist:root')
        },
    },
  });

  const calculateTotalAmount = (state: Cart) => {
    state.totalValue = state.products.reduce((acc, currentValue) => acc + ((Number(currentValue.price_with_discount) * currentValue.quantity)), 0,);
  }

  export const { addProduct, incrementProduct, decrementProduct, setProductAmount, removeProduct, clearProduct } = productSlice.actions;

  export default productSlice.reducer;