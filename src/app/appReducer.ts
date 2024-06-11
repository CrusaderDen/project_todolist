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

//
// export const appReducer = (state: InitialStateType = InitialState, action: AppActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         default:
//             return {...state}
//     }
// }

// export const setAppErrorAC = (error: string | null) => ({ type: "APP/SET-ERROR", error }) as const
// export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status }) as const
//
// export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
// export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
// export type AppActionsType = setAppErrorActionType | setAppStatusActionType
