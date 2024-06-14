import { ServerTodolistType, api } from "api/api"
import { Dispatch } from "redux"
import { RequestStatusType, setAppStatusAC } from "app/appReducer"
import { AppThunk } from "app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: TodolistDomainType[] = []

const slice = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    RemoveTodolistAC(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index > -1) {
        state.splice(index, 1)
      }
    },
    AddTodolistAC(state, action: PayloadAction<{ todolist: ServerTodolistType }>) {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    },
    ChangeTodolistTitleAC(state, action: PayloadAction<{ id: string; title: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index > -1) {
        state[index].title = action.payload.title
      }
    },
    ChangeTodolistFilterAC(state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index > -1) {
        state[index].filter = action.payload.filter
      }
    },
    SetTodolistsAC(state, action: PayloadAction<{ todolists: ServerTodolistType[] }>) {
      return action.payload.todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
    },
    ChangeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string; status: RequestStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index > -1) {
        state[index].entityStatus = action.payload.status
      }
    },
    TotalClearAfterLogoutAC() {
      const result: any = []
      return result
    },
  },
})

export const todolistsReducer = slice.reducer
export const {
  RemoveTodolistAC,
  AddTodolistAC,
  ChangeTodolistTitleAC,
  ChangeTodolistFilterAC,
  SetTodolistsAC,
  ChangeTodolistEntityStatusAC,
  TotalClearAfterLogoutAC,
} = slice.actions

//---------Reducer
// export const _todolistsReducer = (
//   state: TodolistDomainType[] = [],
//   action: TodolistsActionType,
// ): TodolistDomainType[] => {
//   switch (action.types) {
//     case "REMOVE-TODOLIST":
//       return state.filter(tl => tl.id !== action.id)
//     case "ADD-TODOLIST":
//       return [{ ...action.todolist, filter: "all", entityStatus: "idle" }, ...state]
//     case "CHANGE-TODOLIST-TITLE":
//       return state.map(tl => (tl.id === action.id ? { ...tl, title: action.title } : tl))
//     case "CHANGE-TODOLIST-FILTER":
//       return state.map(tl => (tl.id === action.id ? { ...tl, filter: action.filter } : tl))
//     case "SET-TODOLISTS":
//       return action.todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
//     case "CHANGE-TODOLIST-ENTITY-STATUS":
//       return state.map(tl => (tl.id === action.id ? { ...tl, entityStatus: action.status } : tl))
//     default:
//       return state
//   }
// }

//---------Action creators
// export const _RemoveTodolistAC = (id: string): RemoveTodolistActionType => ({ types: "REMOVE-TODOLIST", id }) as const
// export const _AddTodolistAC = (todolist: ServerTodolistType) => ({ types: "ADD-TODOLIST", todolist }) as const
// export const _ChangeTodolistTitleAC = (id: string, title: string) =>
//   ({ types: "CHANGE-TODOLIST-TITLE", id, title }) as const
// export const _ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
//   ({ types: "CHANGE-TODOLIST-FILTER", id, filter }) as const
// export const _SetTodolistsAC = (todolists: ServerTodolistType[]) => ({ types: "SET-TODOLISTS", todolists }) as const
// export const _ChangeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
//   ({ types: "CHANGE-TODOLIST-ENTITY-STATUS", id, status }) as const

//---------Thunks
export const getTodolistsTC = () => async (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  const res = await api.getTodolists()
  dispatch(SetTodolistsAC({ todolists: res.data }))
  dispatch(setAppStatusAC({ status: "succeeded" }))
}

export const deleteTodolistTC =
  (todolistId: string): AppThunk =>
  async (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    dispatch(ChangeTodolistEntityStatusAC({ id: todolistId, status: "loading" }))
    const res = await api.deleteTodolist(todolistId)
    dispatch(RemoveTodolistAC({ id: todolistId }))
    dispatch(setAppStatusAC({ status: "succeeded" }))
  }

export const createTodolistTC = (title: string) => async (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  const res = await api.createTodolist(title)
  dispatch(AddTodolistAC({ todolist: res.data.data.item }))
  dispatch(setAppStatusAC({ status: "succeeded" }))
}

export const changeTodolistTitleTC =
  (todolistId: string, title: string) => async (dispatch: Dispatch<TodolistsActionType>) => {
    const res = await api.updateTodolistTitle(todolistId, title)
    dispatch(ChangeTodolistTitleAC({ id: todolistId, title: title }))
  }

//---------Types
export type TodolistsActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | SetTodolistsActionType
  | ReturnType<typeof ChangeTodolistTitleAC>
  | ReturnType<typeof ChangeTodolistFilterAC>
  | ReturnType<typeof ChangeTodolistEntityStatusAC>

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST"
  id: string
}
export type AddTodolistActionType = {
  type: "ADD-TODOLIST"
  todolist: ServerTodolistType
}
export type SetTodolistsActionType = {
  type: "SET-TODOLISTS"
  todolists: ServerTodolistType[]
}

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = ServerTodolistType & { filter: FilterValuesType; entityStatus: RequestStatusType }

type ThunkDispatch = Dispatch
