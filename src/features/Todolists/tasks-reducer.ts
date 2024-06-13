import { AddTodolistAC, RemoveTodolistAC, SetTodolistsAC, TotalClearAfterLogoutAC } from "./todolists-reducer"
import { api, ServerTaskType, TaskPriorities, TaskStatuses, UpdateTaskModelType } from "api/api"
import { Dispatch } from "redux"
import { AppRootStateType } from "app/store"
import { setAppStatusAC } from "app/appReducer"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "utils/createAppAsyncThunk"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    updateTask(state, action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateDomainTaskModelType }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex(task => task.id === action.payload.taskId)
        if (index > -1) {
          tasks.splice(index, 1)
        }
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task)
      })
      .addCase(AddTodolistAC, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(RemoveTodolistAC, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(SetTodolistsAC, (state, action) => {
        const result: TasksStateType = {}
        for (let i = 0; i < action.payload.todolists.length; i++) {
          result[action.payload.todolists[i].id] = []
        }
        return result
      })
      .addCase(TotalClearAfterLogoutAC, (state, action) => {
        const result = {}
        return result
      })
  },
})

//---------Thunk

const getTasks = createAppAsyncThunk<{ tasks: ServerTaskType[]; todolistId: string }, string>(
  `${slice.name}/getTasks`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatusAC({ status: "loading" }))
      const res = await api.getTodolistTasks(todolistId)
      dispatch(setAppStatusAC({ status: "succeeded" }))
      return { tasks: res.data.items, todolistId: todolistId }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const deleteTask = createAppAsyncThunk<any, { todolistId: string; taskId: string }>(
  `${slice.name}/deleteTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const res = await api.deleteTodolistTask(arg.todolistId, arg.taskId)
      // dispatch(tasksActions.removeTask({ todolistId: payload.todolistId, taskId: payload.taskId }))
      return { todolistId: arg.todolistId, taskId: arg.taskId }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const createTask = createAppAsyncThunk<any, { todolistId: string; title: string }>(
  `${slice.name}/createTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatusAC({ status: "loading" }))
      const res = await api.createTodolistTask(arg.todolistId, arg.title)
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC({ status: "succeeded" }))
        return { task: res.data.data.item }
      } else {
        handleServerAppError(res.data, dispatch)
      }
      dispatch(setAppStatusAC({ status: "succeeded" }))
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const updateTaskTC =
  (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
  (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
      console.warn("Task not found in the state")
      return
    }
    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel,
    }
    api
      .updateTask(todolistId, taskId, apiModel)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(tasksActions.updateTask({ todolistId, taskId, model: domainModel }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string | null
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string | null
  deadline?: string | null
}

export type TasksStateType = {
  [key: string]: ServerTaskType[]
}

type ThunkDispatch = Dispatch

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { getTasks, deleteTask, createTask }
