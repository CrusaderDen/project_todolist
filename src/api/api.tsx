import axios from "axios"
import { LoginType } from "features/Login/Login"
import { UpdateDomainTaskModelType } from "features/Todolists/tasks-reducer"

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "750b834e-bc51-43bd-beec-013db0e3f0f0",
  },
})

//---------API

export const authAPI = {
  me() {
    return instance.get<ResponseType<UserType>>("/auth/me")
  },
  logIn(data: LoginType) {
    return instance.post<ResponseType<{ userId: number }>>("/auth/login", data)
  },
  logOut() {
    return instance.delete("/auth/login")
  },
}

export const api = {
  //Todolists requests
  getTodolists() {
    return instance.get<ServerTodolistType[]>("/todo-lists")
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: ServerTodolistType }>>(`/todo-lists/`, { title })
  },
  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put<ResponseType<{ item: ServerTodolistType }>>(`/todo-lists/${todolistId}`, { title })
  },

  //Tasks requests
  getTodolistTasks(todolistId: string) {
    return instance.get<getTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
  },
  createTodolistTask(arg: ArgsAddTask) {
    const { todolistId, title } = arg
    return instance.post<ResponseType<{ item: ServerTaskType }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTodolistTask(arg: ArgsDeleteTask) {
    const { todolistId, taskId } = arg
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<{ items: ServerTaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

//---------Types

export type ArgsAddTask = {
  title: string
  todolistId: string
}
export type ArgsUpdateTask = {
  todolistId: string
  taskId: string
  domainModel: UpdateDomainTaskModelType
}

export type ArgsDeleteTask = Omit<ArgsUpdateTask, "domainModel">

//Types for Todos
type FieldErrorType = {
  error: string
  field: string
}
export type ServerTodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

//Types for Tasks
export enum TaskStatuses {
  New,
  InProgress,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low,
  Middle,
  Hi,
  Urgently,
  Later,
}

export type ServerTaskType = {
  id: string
  title: string
  description: string | null
  todoListId: string
  order: number
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string | null
  deadline: string | null
  addedDate: string
}
type getTasksResponseType = {
  items: ServerTaskType[]
  totalCount: number
  error: string | null
}

export type ResponseType<T = {}> = {
  data: T
  messages: string[]
  fieldsErrors: FieldErrorType[]
  resultCode: number
}

// export type TaskResponseType<T = {}> = {
//   data: T
//   messages: string[]
//   fieldsErrors: FieldErrorType[]
//   resultCode: number
// }
export type UpdateTaskModelType = {
  title: string
  description: string | null
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string | null
  deadline: string | null
}

type UserType = {
  userId: number
  email: string
  login: string
}
