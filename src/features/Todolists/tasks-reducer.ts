import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType,} from "./todolists-reducer"
import {api, ServerTaskType, TaskPriorities, TaskStatuses, UpdateTaskModelType} from "../../api/api"
import {Dispatch} from "redux"
import {AppRootStateType} from "../../app/store"
import {setAppErrorActionType, setAppStatusAC, setAppStatusActionType} from "../../app/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


//---------Reducer
export const tasksReducer = (state: TasksStateType = {}, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "UPDATE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].map((t) => t.id === action.taskId ? {...t, ...action.model} : t)}
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            const {[action.id]: _, ...newState} = state
            return newState
        case "SET-TODOLISTS":
            const result: TasksStateType = {}
            for (let i = 0; i < action.todolists.length; i++) {
                result[action.todolists[i].id] = []
            }
            return result
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

//---------Action creators
export const RemoveTaskAC = (todolistId: string, taskId: string) => ({type: "REMOVE-TASK", todolistId, taskId}) as const
export const AddTaskAC = (task: any) => ({type: "ADD-TASK", task}) as const
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => ({type: "UPDATE-TASK", todolistId, taskId, model}) as const
export const SetTasksAC = (tasks: ServerTaskType[], todolistId: string) => ({type: "SET-TASKS", tasks, todolistId}) as const


//---------Thunk
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<TaskActionsType | setAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    api.getTodolistTasks(todolistId).then((res) => {
        dispatch(SetTasksAC(res.data.items, todolistId))
        dispatch(setAppStatusAC('succeeded'))
    })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TaskActionsType>) => {
    api.deleteTodolistTask(todolistId, taskId).then((res) => {
        dispatch(RemoveTaskAC(todolistId, taskId))
    })
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<TaskActionsType | setAppErrorActionType | setAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    api.createTodolistTask(todolistId, title).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(AddTaskAC(res.data.data.item))
        } else {
            // if (res.data.messages.length) {
            //     dispatch(setAppErrorAC(res.data.messages[0]))
            // } else {
            //     dispatch(setAppErrorAC('Sorry. Some error occurred'))
            // }
            // dispatch(setAppStatusAC('failed'))
            handleServerAppError(res.data, dispatch)
        }
        dispatch(setAppStatusAC('succeeded'))
    }).catch((error)=> {
        handleServerNetworkError(error,dispatch)
    })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
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
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error =>{
            handleServerNetworkError(error,dispatch)
        })
    }

//---------Types
export type TaskActionsType =
    | ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof SetTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string | null
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string | null
    deadline?: string | null
}

export type TasksStateType = {
    [key: string]: ServerTaskType[];
};

type ThunkDispatch = Dispatch<TaskActionsType | setAppStatusActionType | setAppErrorActionType>