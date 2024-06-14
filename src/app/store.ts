import { combineReducers, UnknownAction } from "redux"
import { tasksReducer } from "features/Todolists/tasks-reducer"
import { todolistsReducer } from "features/Todolists/todolists-reducer"
import { appReducer } from "./appReducer"
import { useDispatch } from "react-redux"
import { configureStore, ThunkAction } from "@reduxjs/toolkit"
import { authReducer } from "features/auth/model/auth-reducer"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  auth: authReducer,
  app: appReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
// export types RootActionsType = TodolistsActionType | TasksActionType
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>

// @ts-ignore
window.store = store
