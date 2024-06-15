import { setAppStatusAC, setInitializedAC } from "app/appReducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils"
import { authAPI } from "features/auth/api/authApi"
import { LoginParamsType } from "features/auth/api/authApi.types"
import { TotalClearAfterLogoutAC } from "features/Todolists/todolists-reducer"

const initialState = {
  isLoggedIn: false,
}
const slice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

//thunks

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  `${slice.name}/login`,
  async (data, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatusAC({ status: "loading" }))
      const res = await authAPI.logIn(data)
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC({ status: "succeeded" }))
        return { isLoggedIn: true }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/logout`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatusAC({ status: "loading" }))
      const res = await authAPI.logOut()
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC({ status: "succeeded" }))
        dispatch(TotalClearAfterLogoutAC())
        return { isLoggedIn: false }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const initializeApp = createAppAsyncThunk(`${slice.name}/meTC`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(setAppStatusAC({ status: "loading" }))
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({ status: "succeeded" }))
      dispatch(setIsLoggedInAC({ value: true }))
    } else {
      // handleServerAppError(res.data, dispatch)
      dispatch(setAppStatusAC({ status: "failed" }))
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(setInitializedAC({ isInitialized: true }))
  }
})

// export const loginTC = (data: LoginType) => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC({ status: "loading" }))
//   authAPI
//     .logIn(data)
//     .then(res => {
//       if (res.data.resultCode === 0) {
//         dispatch(setIsLoggedInAC({ value: true }))
//         dispatch(setAppStatusAC({ status: "succeeded" }))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch(e => {
//       handleServerNetworkError(e, dispatch)
//     })
// }

// export const meTC = () => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC({ status: "loading" }))
//   authAPI
//     .me()
//     .then(res => {
//       if (res.data.resultCode === 0) {
//         dispatch(setIsLoggedInAC({ value: true }))
//         dispatch(setAppStatusAC({ status: "succeeded" }))
//       } else {
//         // handleServerAppError(res.data, dispatch)
//         dispatch(setAppStatusAC({ status: "failed" }))
//       }
//     })
//     .catch(e => {
//       handleServerNetworkError(e, dispatch)
//     })
//     .finally(() => {
//       dispatch(setInitializedAC({ isInitialized: true }))
//     })
// }

// export const logOutTC = () => (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC({ status: "loading" }))
//   authAPI
//     .logOut()
//     .then(res => {
//       if (res.data.resultCode === 0) {
//         dispatch(setIsLoggedInAC({ value: false }))
//         dispatch(setAppStatusAC({ status: "succeeded" }))
//         dispatch(TotalClearAfterLogoutAC())
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch(e => {
//       handleServerNetworkError(e, dispatch)
//     })
// }

export const { setIsLoggedInAC } = slice.actions
export const authReducer = slice.reducer
export const authThunks = { login, logout, initializeApp }
