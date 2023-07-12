import { configureStore } from '@reduxjs/toolkit';
import user from './slices/usersSlice';
import interview from './slices/interviewSlice';

const store = configureStore({
  reducer: {
    user,
    interview,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
