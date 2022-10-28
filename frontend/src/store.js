import { configureStore } from '@reduxjs/toolkit';
import teamsSlice from './features/teamsSlice';

export const store = configureStore({
  reducer: {
    teams: teamsSlice,
  },
})