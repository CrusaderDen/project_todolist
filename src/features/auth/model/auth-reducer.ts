import { Dispatch } from "redux"
import { setAppStatusAC, setInitializedAC } from "app/appReducer"
import { LoginType } from "features/auth/ui/Login"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TotalClearAfterLogoutAC } from "features/Todolists/todolists-reducer"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { authAPI } from "features/auth/api/authApi"

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
})

export const { setIsLoggedInAC } = slice.actions
export const authReducer = slice.reducer

//thunks
export const loginTC = (data: LoginType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  authAPI
    .logIn(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: true }))
        dispatch(setAppStatusAC({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(e => {
      handleServerNetworkError(e, dispatch)
    })
}

export const meTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  authAPI
    .me()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: true }))
        dispatch(setAppStatusAC({ status: "succeeded" }))
      } else {
        // handleServerAppError(res.data, dispatch)
        dispatch(setAppStatusAC({ status: "failed" }))
      }
    })
    .catch(e => {
      handleServerNetworkError(e, dispatch)
    })
    .finally(() => {
      dispatch(setInitializedAC({ isInitialized: true }))
    })
}
export const logOutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  authAPI
    .logOut()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({ value: false }))
        dispatch(setAppStatusAC({ status: "succeeded" }))
        dispatch(TotalClearAfterLogoutAC())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(e => {
      handleServerNetworkError(e, dispatch)
    })
}
