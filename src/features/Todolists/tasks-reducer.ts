import { AddTodolistAC, RemoveTodolistAC, SetTodolistsAC } from "./todolists-reducer"
import { ServerTaskType, TaskPriorities, TaskStatuses, api, UpdateTaskModelType } from "api/api"
import { Dispatch } from "redux"
import { AppRootStateType } from "app/store"
import { setAppStatusAC } from "app/appReducer"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: TasksStateType = {}

const slice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    RemoveTaskAC(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    },
    AddTaskAC(state, action: PayloadAction<{ task: ServerTaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTaskAC(
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateDomainTaskModelType }>,
    ) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
    SetTasksAC(state, action: PayloadAction<{ tasks: ServerTaskType[]; todolistId: string }>) {
      state[action.payload.todolistId] = action.payload.tasks
    },
  },
  extraReducers: builder => {
    builder
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

export const tasksReducer = slice.reducer
export const { RemoveTaskAC, AddTaskAC, updateTaskAC, SetTasksAC } = slice.actions

//---------Reducer
// export const _tasksReducer = (state: TasksStateType = {}, action: any): TasksStateType => {
//   switch (action.type) {
//     case "REMOVE-TASK":
//       return { ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId) }
//     case "ADD-TASK":
//       return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
//     case "UPDATE-TASK":
//       return {
//         ...state,
//         [action.todolistId]: state[action.payload.todolistId].map(t =>
//           t.id === action.taskId ? { ...t, ...action.model } : t,
//         ),
//       }
//     case AddTodolistAC.type:
//       return { ...state, [action.payload.todolist.id]: [] }
//     case RemoveTodolistAC.type:
//       const { [action.payload.id]: _, ...newState } = state
//       return newState
//     case SetTodolistsAC.type:
//       const result: TasksStateType = {}
//       for (let i = 0; i < action.payload.todolists.length; i++) {
//         result[action.payload.todolists[i].id] = []
//       }
//       return result
//     case "SET-TASKS":
//       return { ...state, [action.todolistId]: action.tasks }
//     default:
//       return state
//   }
// }

//---------Action creators
// export const RemoveTaskAC = (todolistId: string, taskId: string) =>
//   ({ type: "REMOVE-TASK", todolistId, taskId }) as const
// export const AddTaskAC = (task: any) => ({ type: "ADD-TASK", task }) as const
// export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
//   ({ type: "UPDATE-TASK", todolistId, taskId, model }) as const
// export const SetTasksAC = (tasks: ServerTaskType[], todolistId: string) =>
//   ({ type: "SET-TASKS", tasks, todolistId }) as const

//---------Thunk
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  api.getTodolistTasks(todolistId).then(res => {
    dispatch(SetTasksAC({ tasks: res.data.items, todolistId: todolistId }))
    dispatch(setAppStatusAC({ status: "succeeded" }))
  })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  api.deleteTodolistTask(todolistId, taskId).then(() => {
    dispatch(RemoveTaskAC({ todolistId: todolistId, taskId: taskId }))
  })
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  api
    .createTodolistTask(todolistId, title)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(AddTaskAC({ task: res.data.data.item }))
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
          dispatch(updateTaskAC({ todolistId, taskId, model: domainModel }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }

//---------Types
// export type TasksActionType =
//   | ReturnType<typeof RemoveTaskAC>
//   | ReturnType<typeof AddTaskAC>
//   | ReturnType<typeof updateTaskAC>
//   | ReturnType<typeof SetTasksAC>
//   | AddTodolistActionType
//   | RemoveTodolistActionType
//   | SetTodolistsActionType

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
