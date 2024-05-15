import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType,} from "./todolists-reducer"
import {TasksStateType} from "../../../App"
import {api, ServerTaskType, TaskPriorities, TaskStatuses, UpdateTaskModelType} from "../../../api/api"
import {Dispatch} from "redux"
import {AppRootStateType} from "./store"

//---------Reducer
export const tasksReducer = (state: TasksStateType = {}, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(
                    (t) => t.id !== action.taskId,
                ),
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [
                    action.task,
                    ...state[action.task.todoListId],
                ],
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) =>
                    t.id === action.taskId ? {...t, ...action.model} : t,
                ),
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            const newState = {...state}
            delete newState[action.id]
            return newState
        case "SET-TODOLISTS":
            const result: TasksStateType = {}
            for (let i = 0; i < action.todolists.length; i++) {
                result[action.todolists[i].id] = []
            }
            return result
        case "SET-TASKS":
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        default:
            return state
    }
}
//---------Action creators
export const RemoveTaskAC = (todolistId: string, taskId: string) => ({type: "REMOVE-TASK", todolistId, taskId}) as const
export const AddTaskAC = (task: any) => ({type: "ADD-TASK", task}) as const
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => ({type: "UPDATE-TASK", todolistId, taskId, model}) as const
export const SetTasksAC = (tasks: ServerTaskType[], todolistId: string) => ({type: "SET-TASKS", tasks, todolistId}) as const
//---------AC Types
export type TaskActionsType =
    | ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof SetTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
//---------Thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    api.getTodolistTasks(todolistId).then((res) => {
        dispatch(SetTasksAC(res.data.items, todolistId))
    })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    api.deleteTodolistTask(todolistId, taskId).then((res) => {
        dispatch(RemoveTaskAC(todolistId, taskId))
    })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    api.createTodolistTask(todolistId, title).then((res) => {
        dispatch(AddTaskAC(res.data.data.item))
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
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find((t) => t.id === taskId)
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
    api.updateTask(todolistId, taskId, apiModel).then((res) => {
        dispatch(updateTaskAC(todolistId, taskId, domainModel))
    })
}
