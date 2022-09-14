import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AccountState {
  loginUserId: string,
  loginUserName: string,
  authToken?: string
}

const initialState: AccountState = {
  loginUserId: '',
  loginUserName: '來賓',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    assignAccount: (account, action: PayloadAction<AccountState>) => {
      const loginUser = action.payload
      account.loginUserId = loginUser.loginUserId
      account.loginUserName = loginUser.loginUserName
    },
    resetAccount: () => {
      return initialState
    },
  },
});

export const { assignAccount, resetAccount } = accountSlice.actions;

export default accountSlice.reducer;
