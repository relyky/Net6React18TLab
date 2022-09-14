import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counter from 'views/Demo02/counterSlice'
import metaData from './metaDataSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      metaData,
      counter,
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
