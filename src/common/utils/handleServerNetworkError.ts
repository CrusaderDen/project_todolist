import { setAppErrorAC, setAppStatusAC } from "app/appReducer"
import { AppDispatch } from "app/store"
import axios from "axios"

export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch): void => {
  let errorMessage = "Some error occurred"

  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
  } else {
    errorMessage = JSON.stringify(err)
  }
  dispatch(setAppErrorAC({ error: errorMessage }))
  dispatch(setAppStatusAC({ status: "failed" }))
}
