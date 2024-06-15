import { UpdateDomainTaskModelType } from "features/Todolists/tasks-reducer"
import { instance } from "common/instance/instance"
import { TaskPriorities, TaskStatuses } from "common/enums/Enums"
import { BaseResponseType } from "common/types"

//---------API

export const api = {
  //Todolists requests
  getTodolists() {
    return instance.get<ServerTodolistType[]>("/todo-lists")
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
  },
  createTodolist(title: string) {
    return instance.post<BaseResponseType<{ item: ServerTodolistType }>>(`/todo-lists/`, { title })
  },
  updateTodolistTitle(arg: ArgsUpdateTodolistTitle) {
    const { todolistId, title } = arg
    return instance.put<BaseResponseType<{ item: ServerTodolistType }>>(`/todo-lists/${todolistId}`, { title })
  },

  //Tasks requests
  getTodolistTasks(todolistId: string) {
    return instance.get<getTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
  },
  createTodolistTask(arg: ArgsAddTask) {
    const { todolistId, title } = arg
    return instance.post<BaseResponseType<{ item: ServerTaskType }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTodolistTask(arg: ArgsDeleteTask) {
    const { todolistId, taskId } = arg
    return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponseType<{ items: ServerTaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
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

export type ArgsUpdateTodolistTitle = {
  todolistId: string
  title: string
}

export type ArgsDeleteTask = Omit<ArgsUpdateTask, "domainModel">

//Types for Todos

export type ServerTodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

//Types for Tasks

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

export type UpdateTaskModelType = {
  title: string
  description: string | null
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string | null
  deadline: string | null
}
