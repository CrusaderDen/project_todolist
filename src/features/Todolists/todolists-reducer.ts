import { api, ArgsUpdateTodolistTitle, ServerTodolistType } from "api/api"
import { RequestStatusType, setAppStatusAC } from "app/appReducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common"

const initialState: TodolistDomainType[] = []

const slice = createSlice({
  name: "todolists",
  initialState: initialState,
  reducers: {
    ChangeTodolistFilterAC(state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index > -1) {
        state[index].filter = action.payload.filter
      }
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
  extraReducers: builder => {
    builder
      .addCase(getTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(tl => tl.id === action.payload.id)
        if (index > -1) {
          state.splice(index, 1)
        }
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex(tl => tl.id === action.payload.todolistId)
        if (index > -1) {
          state[index].title = action.payload.title
        }
      })
  },
})

//---------Thunks

const getTodolists = createAppAsyncThunk<{ todolists: ServerTodolistType[] }, void>(
  `${slice.name}/getTodolists`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatusAC({ status: "loading" }))
      const res = await api.getTodolists()
      dispatch(setAppStatusAC({ status: "succeeded" }))
      return { todolists: res.data }
    } catch (e) {
      return rejectWithValue(null)
    }
  },
)

const deleteTodolist = createAppAsyncThunk<{ id: string }, string>(
  `${slice.name}/deleteTodolist`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatusAC({ status: "loading" }))
      dispatch(ChangeTodolistEntityStatusAC({ id: todolistId, status: "loading" }))
      const res = await api.deleteTodolist(todolistId)
      dispatch(setAppStatusAC({ status: "succeeded" }))
      return { id: todolistId }
    } catch (e) {
      return rejectWithValue(null)
    }
  },
)

const createTodolist = createAppAsyncThunk<{ todolist: ServerTodolistType }, string>(
  `${slice.name}/createTodolist`,
  async (title, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatusAC({ status: "loading" }))
      const res = await api.createTodolist(title)
      dispatch(setAppStatusAC({ status: "succeeded" }))
      return { todolist: res.data.data.item }
    } catch (e) {
      return rejectWithValue(null)
    }
  },
)

const changeTodolistTitle = createAppAsyncThunk<ArgsUpdateTodolistTitle, ArgsUpdateTodolistTitle>(
  `${slice.name}`,
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const res = await api.updateTodolistTitle(arg)
      return { todolistId: arg.todolistId, title: arg.title }
    } catch (e) {
      return rejectWithValue(null)
    }
  },
)

//---------Types
export type TodolistsActionType =
  // | RemoveTodolistActionType
  // | AddTodolistActionType
  // | SetTodolistsActionType
  ReturnType<typeof ChangeTodolistFilterAC> | ReturnType<typeof ChangeTodolistEntityStatusAC>

// export type RemoveTodolistActionType = {
//   type: "REMOVE-TODOLIST"
//   id: string
// }
// export type AddTodolistActionType = {
//   type: "ADD-TODOLIST"
//   todolist: ServerTodolistType
// }
// export type SetTodolistsActionType = {
//   type: "SET-TODOLISTS"
//   todolists: ServerTodolistType[]
// }

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = ServerTodolistType & { filter: FilterValuesType; entityStatus: RequestStatusType }

// type ThunkDispatch = Dispatch

export const todolistsReducer = slice.reducer
export const { ChangeTodolistFilterAC, ChangeTodolistEntityStatusAC, TotalClearAfterLogoutAC } = slice.actions

export const todolistsThunks = { getTodolists, deleteTodolist, createTodolist, changeTodolistTitle }
