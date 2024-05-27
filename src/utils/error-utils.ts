import { setAppErrorAC, setAppStatusAC } from "../app/appReducer"
import { TaskResponseType } from "../api/api"
import { Dispatch } from "redux"

export const handleServerAppError = <T>(data: TaskResponseType<T>, dispatch: Dispatch) => {
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
