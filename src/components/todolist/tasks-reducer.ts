import {TasksStateType} from "../../App";
import {v1} from "uuid";


// type ActionUniversalType = {
//     type: string
//     [key: string]: any
// }

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TACK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}

export type TaskActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType


export const RemoveTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK' as const,
        todolistId: todolistId,
        taskId: taskId
    }
}

export const AddTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK' as const,
        todolistId: todolistId,
        title: title
    }
}

export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE' as const,
        todolistId: todolistId,
        taskId: taskId,
        title: title,
    }
}

export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TACK-STATUS' as const,
        todolistId: todolistId,
        taskId: taskId,
        isDone: isDone
    }
}

export const tasksReducer = (state: TasksStateType, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            state[action.todolistId] = state[action.todolistId].filter(t => t.id !== action.taskId)
            return {...state}
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.title, isDone: false}
            state[action.todolistId] = [newTask, ...state[action.todolistId]]
            return {...state}
        case 'CHANGE-TASK-TITLE':
            const tasks = state[action.todolistId]
            const currentTack = tasks.find(t => t.id === action.taskId)
            if (currentTack) currentTack.title = action.title
            return {...state}
        case 'CHANGE-TACK-STATUS':
            const changeStatusTasks = state[action.todolistId]
            const changeStatusCurrentTack = changeStatusTasks.find(t => t.id === action.taskId)
            if (changeStatusCurrentTack) changeStatusCurrentTack.isDone = action.isDone
            return {...state}
        default:
            throw new Error('Unknown action type')
    }

}



