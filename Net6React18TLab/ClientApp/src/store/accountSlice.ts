import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postData } from 'hooks/useHttp'
import { setBlocking } from 'store/metaDataSlice'
import Swal from 'sweetalert2'

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

const initialState: AccountState = {
  loginUserId: '',
  loginUserName: '來賓',
  status: AuthStatus.Guest
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    assignAccount: (account, action: PayloadAction<AccountState & AccountAuth>) => {
      const loginUser = action.payload

      // update account
      account.loginUserId = loginUser.loginUserId
      account.loginUserName = loginUser.loginUserName
      account.expiredTime = loginUser.expiredTime
      account.status = AuthStatus.Authed

      // update authToken
      sessionStorage.setItem(process.env.REACT_APP_AUTH_TOKEN as string, loginUser.authToken as string)
    },
    resetAccount: (account) => {
      // reset authToken
      sessionStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN as string)
      // reset account
      account.loginUserId = initialState.loginUserId
      account.loginUserName = initialState.loginUserName
      account.expiredTime = initialState.expiredTime
      account.status = initialState.status
    },
    setAuthing: (account) => {
      account.status = AuthStatus.Authing
    },
  },
});

const { assignAccount, resetAccount, setAuthing } = accountSlice.actions;
export default accountSlice.reducer;

//-----------------------------------------------------------------------------
// API Thunk

// 登入
export const signInAsync = createAsyncThunk(
  'accountAPI/signIn',
  async (args: LoginArgs, thunkAPI) => {
    try {
      thunkAPI.dispatch(setBlocking(true))
      thunkAPI.dispatch(setAuthing())
      const result: any = await postData('api/Account/SignIn', args)
      thunkAPI.dispatch(assignAccount(result))
    }
    catch (err) {
      thunkAPI.dispatch(resetAccount())
      const message = '請確認帳號密碼正確。'
      Swal.fire('登入失敗', message, 'error')
    }
    finally {
      thunkAPI.dispatch(setBlocking(false))
    }
  }
)

// 取現在登入者資訊
export const getAuthInfoAsync = createAsyncThunk(
  'accountAPI/getAuthInfo',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setBlocking(true))
      thunkAPI.dispatch(setAuthing())
      const result: any = await postData('api/Account/GetAuthInfo')
      thunkAPI.dispatch(assignAccount(result))
    }
    catch (err) {
      thunkAPI.dispatch(resetAccount())
    }
    finally {
      thunkAPI.dispatch(setBlocking(false))
    }
  }
)

// 登出
export const signOutAsync = createAsyncThunk(
  'accountAPI/signOut',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setBlocking(true))
      thunkAPI.dispatch(setAuthing())
      await postData('api/Account/Logout')
    }
    finally {
      thunkAPI.dispatch(resetAccount())
      thunkAPI.dispatch(setBlocking(false))
    }
  }
)
