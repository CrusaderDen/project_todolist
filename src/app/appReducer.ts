import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
}

const InitialState: InitialStateType = {
  status: "idle",
  error: null,
  isInitialized: false,
}

const slice = createSlice({
  name: "app",
  initialState: InitialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer
export const { setAppStatusAC, setAppErrorAC, setInitializedAC } = slice.actions
