import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";
import {TasksStateType} from "../../../App";

//---------Initial state
const initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: true},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Next JS', isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: 'Эклерчики', isDone: true},
        {id: v1(), title: 'Пивко', isDone: false},
        {id: v1(), title: 'Чипсы', isDone: true},
    ],
}
//---------Reducer
export const tasksReducer = (state = initialState, action: TaskActionsType): TasksStateType => {
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
            // throw new Error('Unknown action type')
            return state
    }

}
//---------Action creators
export const RemoveTaskAC = (todolistId: string, taskId: string) => ({type: 'REMOVE-TASK', todolistId, taskId} as const)
export const AddTaskAC = (todolistId: string, title: string) => ({type: 'ADD-TASK', todolistId, title} as const)
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const)
export const ChangeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => ({type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone} as const)
//---------AC Types
export type TaskActionsType
    = ReturnType<typeof RemoveTaskAC>
    | ReturnType<typeof AddTaskAC>
    | ReturnType<typeof ChangeTaskTitleAC>
    | ReturnType<typeof ChangeTaskStatusAC>
    | AddTodolistActionType
    | RemoveTodolistActionType




