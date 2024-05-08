import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../../../App";
//---------Initial state
export const todolistId1 = v1()
export const todolistId2 = v1()
const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
]
//---------Reducer
export const todolistsReducer = (state = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}
//---------Action creators
export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const AddTodolistAC = (newTitle: string) => ({type: 'ADD-TODOLIST', title: newTitle, todolistId: v1()} as const)
export const ChangeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', title, id} as const)
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
//---------AC Types
export type ActionsType
    = RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
//---------AC Types for export
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}