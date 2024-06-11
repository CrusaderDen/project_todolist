import { Dispatch } from "redux"
import { setAppStatusAC, setInitializedAC } from "app/appReducer"
import { authAPI } from "api/api"
import { LoginType } from "features/Login/Login"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"

const initialState = {
  isLoggedIn: false,
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value }
    default:
      return { ...state }
  }
}

//actions
export const setIsLoggedInAC = (value: boolean) => ({ type: "login/SET-IS-LOGGED-IN", value }) as const
//thunks
export const loginTC = (data: LoginType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  authAPI
    .logIn(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
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
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
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
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(e => {
      handleServerNetworkError(e, dispatch)
    })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
