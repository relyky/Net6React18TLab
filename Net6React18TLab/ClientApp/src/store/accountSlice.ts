import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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

// 登入
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

// 取現在登入者資訊
export const getAuthInfoAsync = createAsyncThunk(
  'accountAPI/getAuthInfo',
  async (_, _thunkAPI) => {
    try {
      _thunkAPI.dispatch(setBlocking(true))
      const result = await postData('api/Account/GetAuthInfo')
      return result
    }
    finally {
      _thunkAPI.dispatch(setBlocking(false))
    }
  }
)

// 登出
export const signOutAsync = createAsyncThunk(
  'accountAPI/signOut',
  async (_, _thunkAPI) => {
    try {
      _thunkAPI.dispatch(setBlocking(true))
      await postData('api/Account/Logout')
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
        const data = action.payload as AccountState & AccountAuth
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
      //------------
      .addCase(getAuthInfoAsync.pending, (state, action) => {
        state.status = AuthStatus.Authing
      })
      .addCase(getAuthInfoAsync.fulfilled, (state, action) => {
        const data = action.payload as AccountState & AccountAuth
        // update account
        state.loginUserId = data.loginUserId
        state.loginUserName = data.loginUserName
        state.expiredTime = data.expiredTime
        state.status = AuthStatus.Authed

        // update authToken
        sessionStorage.setItem(process.env.REACT_APP_AUTH_TOKEN as string, data.authToken as string)
      })
      .addCase(getAuthInfoAsync.rejected, (state, action) => {
        state.status = AuthStatus.Guest;
      })
      //------------
      .addCase(signOutAsync.pending, (state, action) => {
        state.status = AuthStatus.Authing
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        //※ 登出成功並清除登入資訊。
        // reset authToken
        sessionStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN as string)
        // update account
        state.loginUserId = initialState.loginUserId
        state.loginUserName = initialState.loginUserName
        state.expiredTime = initialState.expiredTime
        state.status = initialState.status
      })
      .addCase(signOutAsync.rejected, (state, action) => {
        //※ 登出失敗一樣清除登入資訊。
        console.error('登出失敗一樣清除登入資訊。');
        // reset authToken
        sessionStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN as string)
        // update account
        state.loginUserId = initialState.loginUserId
        state.loginUserName = initialState.loginUserName
        state.expiredTime = initialState.expiredTime
        state.status = initialState.status
      })
  },
});

//const { assignAccount, resetAccount } = accountSlice.actions;
export default accountSlice.reducer;
