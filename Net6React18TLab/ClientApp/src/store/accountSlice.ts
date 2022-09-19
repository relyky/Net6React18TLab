import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { findAllByLabelText } from '@testing-library/react'
import { postData } from 'hooks/useHttp'
import { setBlocking } from 'store/metaDataSlice'

export enum AuthStatus {
  Guest = "Guest",
  Authing = "Authing",
  Authed = "Authed"
}

export interface AccountState {
  loginUserId: string,
  loginUserName: string,
  status: AuthStatus
  expiredTime?: string,
}

export interface AccountAuth {
  authToken: string
}

export interface LoginArgs {
  userId: string,
  credential: string,
  vcode: string,
  returnUrl?: string
}

//-----------------------------------------------------------------------------
// API Thunk
export const signInAsync = createAsyncThunk(
  'accountAPI/signIn',
  async (args: LoginArgs, _thunkAPI) => {
    try {
      _thunkAPI.dispatch(setBlocking(true))
      const result = await postData('api/Account/SignIn', args)
      return result
    }
    finally {
      _thunkAPI.dispatch(setBlocking(false))
    }
  }
)

// API Thunk
export const getLoginInfoAsync = createAsyncThunk(
  'accountAPI/getLoginInfo',
  async (_, _thunkAPI) => {
    try {
      _thunkAPI.dispatch(setBlocking(true))
      const result = await postData('api/Account/GetLoginInfo')
      return result
    }
    finally {
      _thunkAPI.dispatch(setBlocking(false))
    }
  }
)

//-----------------------------------------------------------------------------

const initialState: AccountState = {
  loginUserId: '',
  loginUserName: '來賓',
  status: AuthStatus.Guest
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    //assignAccount: (account, action: PayloadAction<AccountState & AccountAuth>) => {
    //  const loginUser = action.payload
    //  // update authToken
    //  sessionStorage.setItem(process.env.REACT_APP_AUTH_TOKEN as string, loginUser.authToken as string)
    //  // update account
    //  account.loginUserId = loginUser.loginUserId
    //  account.loginUserName = loginUser.loginUserName
    //  account.expiredTime = loginUser.expiredTime
    //},
    //resetAccount: () => {
    //  return initialState
    //},
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state, action) => {
        state.status = AuthStatus.Authing
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        const data: any = action.payload as AccountState & AccountAuth
        // update account
        state.loginUserId = data.loginUserId
        state.loginUserName = data.loginUserName
        state.expiredTime = data.expiredTime
        state.status = AuthStatus.Authed

        // update authToken
        sessionStorage.setItem(process.env.REACT_APP_AUTH_TOKEN as string, data.authToken as string)
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.status = AuthStatus.Guest;
      })
      .addCase(getLoginInfoAsync.pending, (state, action) => {
        state.status = AuthStatus.Authing
      })
      .addCase(getLoginInfoAsync.fulfilled, (state, action) => {
        const data = action.payload as AccountState & AccountAuth
        // update account
        state.loginUserId = data.loginUserId
        state.loginUserName = data.loginUserName
        state.expiredTime = data.expiredTime
        state.status = AuthStatus.Authed

        // update authToken
        sessionStorage.setItem(process.env.REACT_APP_AUTH_TOKEN as string, data.authToken as string)
      })
      .addCase(getLoginInfoAsync.rejected, (state, action) => {
        state.status = AuthStatus.Guest;
      })
  },
});

//const { assignAccount, resetAccount } = accountSlice.actions;
export default accountSlice.reducer;
