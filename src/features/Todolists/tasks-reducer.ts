import { todolistsThunks, TotalClearAfterLogoutAC } from "./todolists-reducer"
import { api, ArgsAddTask, ArgsDeleteTask, ArgsUpdateTask, ServerTaskType, UpdateTaskModelType } from "api/api"
import { setAppStatusAC } from "app/appReducer"
import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common"
import { TaskPriorities, TaskStatuses } from "common/enums"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {},
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
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex(task => task.id === action.payload.taskId)
        if (index > -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      })
      .addCase(todolistsThunks.createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsThunks.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistsThunks.getTodolists.fulfilled, (state, action) => {
        const result: TasksStateType = {}
        for (let i = 0; i < action.payload.todolists.length; i++) {
          result[action.payload.todolists[i].id] = []
        }
        return result
      })
      // .addCase(todolistsThunks.getTodolists.fulfilled, (state, action) => {
      //   action.payload.todolists.forEach((tl) => {
      //     state[tl.id] = []
      //   })
      // })
      .addCase(TotalClearAfterLogoutAC, () => {
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

const deleteTask = createAppAsyncThunk<any, ArgsDeleteTask>(`${slice.name}/deleteTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    const res = await api.deleteTodolistTask(arg)
    return { todolistId: arg.todolistId, taskId: arg.taskId }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

const createTask = createAppAsyncThunk<{ task: ServerTaskType }, ArgsAddTask>(
  `${slice.name}/createTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatusAC({ status: "loading" }))
      const res = await api.createTodolistTask(arg)
      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC({ status: "succeeded" }))
        return { task: res.data.data.item }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const updateTask = createAppAsyncThunk<ArgsUpdateTask, ArgsUpdateTask>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    try {
      const state = getState()
      const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)
      if (!task) {
        console.warn("Task not found in the state")
        return rejectWithValue(null)
      }
      const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...arg.domainModel,
      }
      const res = await api.updateTask(arg.todolistId, arg.taskId, apiModel)
      if (res.data.resultCode === 0) {
        return arg
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

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

export const tasksReducer = slice.reducer
export const tasksThunks = { getTasks, deleteTask, createTask, updateTask }
