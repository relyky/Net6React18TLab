import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ErrMsg } from 'common'

export interface MetaDataState {
  blocking: boolean,
  errMsg: ErrMsg | null,
  [key: string]: unknown
}

const initialState: MetaDataState = {
  blocking: false,
  errMsg: null,
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
