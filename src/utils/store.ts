import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../services/auth/authSlice';
import locationReducer from '../services/google/locationSlice'
export const store = configureStore({
  reducer: {
    authToken: authReducer,
    currentLocation : locationReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch