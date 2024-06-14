import { Dispatch } from "redux"
import { setAppErrorAC, setAppStatusAC } from "app/appReducer"
import { ResponseType } from "common/types/ResponseType"

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({ error: data.messages[0] }))
  } else {
    dispatch(setAppErrorAC({ error: "Sorry. Some error occurred" }))
  }
  dispatch(setAppStatusAC({ status: "failed" }))
}
