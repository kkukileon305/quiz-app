import { configureStore } from '@reduxjs/toolkit';
import { option } from './slices/option';

const store = configureStore({
  reducer: {
    option: option.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
