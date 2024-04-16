import {TasksStateType} from "../../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


//---------Types
type RemoveTaskActionType = ReturnType<typeof RemoveTaskAC>
type AddTaskActionType = ReturnType<typeof AddTaskAC>
type ChangeTaskTitleActionType = ReturnType<typeof ChangeTaskTitleAC>
type ChangeTaskStatusActionType = ReturnType<typeof ChangeTaskStatusAC>
//---------Common type
export type TaskActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
//---------Reducer
export const tasksReducer = (state: TasksStateType, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => (t.id === action.taskId) ? {...t, title: action.title} : t)
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => (t.id === action.taskId) ? {...t, isDone: action.isDone} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            const newState = {...state}
            delete newState[action.id]
            return newState

        default:
            throw new Error('Unknown action type')
    }

}

//---------Action creators
export const RemoveTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK' as const,
        todolistId: todolistId,
        taskId: taskId
    } as const
}

export const AddTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK' as const,
        todolistId: todolistId,
        title: title
    } as const
}

export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE' as const,
        todolistId: todolistId,
        taskId: taskId,
        title: title,
    } as const
}

export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS' as const,
        todolistId: todolistId,
        taskId: taskId,
        isDone: isDone
    } as const
}



