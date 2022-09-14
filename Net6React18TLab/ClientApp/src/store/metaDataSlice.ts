import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MetaDataState {
  blocking: boolean,
  [key: string]: unknown
}

const initialState: MetaDataState = {
  blocking: false,
};

const metaDataSlice = createSlice({
  name: 'metaData',
  initialState,
  reducers: {
    assignMeta: (state, action: PayloadAction<object>) => {
      return { ...state, ...action.payload }
    },
    setBlocking: (state, action: PayloadAction<boolean>) => {
      state.blocking = action.payload
    }, 
  },
});

export const { assignMeta, setBlocking } = metaDataSlice.actions;

export default metaDataSlice.reducer;
