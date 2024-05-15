import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { tasksReducer } from "./tasks-reducer"
import { todolistsReducer } from "./todolists-reducer"
import { thunk } from "redux-thunk"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
})

// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
