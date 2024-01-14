import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from '../services/auth/authSlice';
import userReducer from '../services/user/userSlice';
import locationReducer from '../services/google/locationSlice'
import categoryReducer from '../services/category/categorySlice';
import cardReducer from '../services/card/cardSlice';
import productReducer from '../services/product/productSlice';
import addressReducer from '../services/address/addressSlice';


// adding our persist configs
export const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,

};

  // adding our rootReducer
const rootReducer = combineReducers({
    authToken: authReducer,
    user: userReducer,
    currentCard: cardReducer,
    currentLocation : locationReducer,
    categorySelected: categoryReducer,
    productsCart: productReducer,
    currentAddress: addressReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch