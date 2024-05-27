import { combineReducers, UnknownAction } from "redux"
import { TasksActionType, tasksReducer } from "features/Todolists/tasks-reducer"
import { TodolistsActionType, todolistsReducer } from "features/Todolists/todolists-reducer"
import { ThunkAction } from "redux-thunk"
import { appReducer } from "./appReducer"
import { useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootActionsType = TodolistsActionType | TasksActionType
export type AppDispatch = any
export const useAppDispatch = useDispatch<AppDispatch>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>
