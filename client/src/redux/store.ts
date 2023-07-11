import { configureStore } from '@reduxjs/toolkit';
import users from './slices/usersSlice';
import interview from './slices/interviewSlice';

const store = configureStore({
  reducer: {
    users,
    interview,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
