import { AddTodolistAC, RemoveTodolistAC, SetTodolistsAC } from "./todolists-reducer"
import { ServerTaskType, TaskPriorities, TaskStatuses, api, UpdateTaskModelType } from "api/api"
import { Dispatch } from "redux"
import { AppRootStateType } from "app/store"
import { setAppStatusAC } from "app/appReducer"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    removeTask(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    },
    addTask(state, action: PayloadAction<{ task: ServerTaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTask(state, action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateDomainTaskModelType }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
    // setTasks(state, action: PayloadAction<{ tasks: ServerTaskType[]; todolistId: string }>) {
    //   state[action.payload.todolistId] = action.payload.tasks
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
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
  },
})

//---------Thunk

const getTasks = createAsyncThunk(`${slice.name}/getTasks`, async (todolistId: string, thunkAPI) => {
  const { dispatch } = thunkAPI
  dispatch(setAppStatusAC({ status: "loading" }))
  const res = await api.getTodolistTasks(todolistId)
  // dispatch(tasksActions.setTasks({ tasks: res.data.items, todolistId: todolistId }))
  dispatch(setAppStatusAC({ status: "succeeded" }))
  return { tasks: res.data.items, todolistId: todolistId }
})

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  api.deleteTodolistTask(todolistId, taskId).then(() => {
    dispatch(tasksActions.removeTask({ todolistId: todolistId, taskId: taskId }))
  })
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  api
    .createTodolistTask(todolistId, title)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(tasksActions.addTask({ task: res.data.data.item }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
      dispatch(setAppStatusAC({ status: "succeeded" }))
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}

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
export const tasksThunks = { getTasks }
