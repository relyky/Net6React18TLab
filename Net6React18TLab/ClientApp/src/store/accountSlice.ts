import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AccountState {
  loginUserId: string,
  loginUserName: string,
  expiredTime?: string,
}

export interface AccountAuth {
  authToken: string
}

const initialState: AccountState = {
  loginUserId: '',
  loginUserName: '來賓',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    assignAccount: (account, action: PayloadAction<AccountState & AccountAuth>) => {
      const loginUser = action.payload
      // update authToken
      sessionStorage.setItem(process.env.REACT_APP_AUTH_TOKEN as string, loginUser.authToken as string)
      // update account
      account.loginUserId = loginUser.loginUserId
      account.loginUserName = loginUser.loginUserName
      account.expiredTime = loginUser.expiredTime
    },
    resetAccount: () => {
      return initialState
    },
  },
});

export const { assignAccount, resetAccount } = accountSlice.actions;

export default accountSlice.reducer;
