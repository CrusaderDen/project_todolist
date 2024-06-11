import { setAppErrorAC, setAppStatusAC } from "app/appReducer"
import { ResponseType } from "api/api"
import { Dispatch } from "redux"

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({ error: data.messages[0] }))
  } else {
    dispatch(setAppErrorAC({ error: "Sorry. Some error occurred" }))
  }
  dispatch(setAppStatusAC({ status: "failed" }))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC({ error: error.message ? error.message : "Some error occurred" }))
  dispatch(setAppStatusAC({ status: "failed" }))
}
