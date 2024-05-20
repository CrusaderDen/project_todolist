import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { tasksReducer } from "../features/Todolists/tasks-reducer"
import { todolistsReducer } from "../features/Todolists/todolists-reducer"
import { thunk } from "redux-thunk"
import {appReducer} from "./appReducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
