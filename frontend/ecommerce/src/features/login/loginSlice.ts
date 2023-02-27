import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { refreshUser, userFetch, userRegister } from './loginAPI';
import jwt_decode from "jwt-decode"
import { toast } from 'react-toastify';



export interface LoginSlice {
  userLogged: string
  isAdmin: boolean
  // userID: string
}

const initialState: LoginSlice = {
  userLogged: "",
  isAdmin: false,
  // userID: ""

};

export const loginAsync = createAsyncThunk(
  'login/userFetch',
  async (creds: any) => {
    const response = await userFetch(creds);
    return response.data;

  }
);

export const registerAsync = createAsyncThunk(
  'register/regUser',
  async (creds: any) => {
    const response = await userRegister(creds);
    return response.data;
  }
);

export const refreshAsync = createAsyncThunk(
  'refresh/irefresh',
  async (refresh: any) => {
    const response = await refreshUser(refresh);
    return response.data;
  }
);


export const logoutAsync = createAsyncThunk(
  'logout/logout',
  async (token: any) => {
    const response = await refreshUser(token);
    return response.data;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    load_user: (state, action) => {
      // used to load the user if access token still has more than an hour till it will expire
      state.userLogged = action.payload.username
      { action.payload.username == "admin" ? state.isAdmin = true : state.isAdmin = false }

    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        localStorage.setItem('refresh', action.payload.refresh)
        localStorage.setItem('axx', action.payload.access)
        const tmp: any = jwt_decode(action.payload.access)
        state.userLogged = tmp.username
        { tmp.username == "admin" ? state.isAdmin = true : state.isAdmin = false }
        toast.success(`Welcome ${tmp.username}`, {
          position: toast.POSITION.TOP_CENTER
        })
      })
      .addCase(loginAsync.rejected, (state, action) => {
        toast.error('Password or Username Incorrect', {
          position: toast.POSITION.TOP_CENTER
        })

      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        localStorage.setItem('refresh', action.payload.tokens.refresh)
        localStorage.setItem('axx', action.payload.tokens.access)
        state.userLogged = action.payload.user.username
        toast.success(`Registerd Successfully`, {
          position: toast.POSITION.TOP_CENTER
        })

      })
      .addCase(registerAsync.rejected, (state, action) => {
        console.log(action)
        toast.error(action.error.message, {
          position: toast.POSITION.TOP_CENTER
        })

      })


      .addCase(refreshAsync.fulfilled, (state, action) => {
        localStorage.setItem('refresh', action.payload.refresh)
        localStorage.setItem('axx', action.payload.access)
        const tmp: any = jwt_decode(action.payload.access)
        state.userLogged = tmp.username
        // state.userID = tmp.user_id

        { tmp.username == "admin" ? state.isAdmin = true : state.isAdmin = false }
      })

      .addCase(logoutAsync.fulfilled, (state, action) => {
        const tmp: any = jwt_decode(action.payload.access)
        state.userLogged = ""
        { tmp.username == "admin" ? state.isAdmin = true : state.isAdmin = false }
      })
  },
});

export const { load_user } = loginSlice.actions;
export const selectUser = (state: RootState) => state.login.userLogged;
// export const selectUserID = (state: RootState) => state.login.userID;

export default loginSlice.reducer;
