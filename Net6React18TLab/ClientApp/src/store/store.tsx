import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'views/Demo02/counterSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
  })
}

const store = makeStore()

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
