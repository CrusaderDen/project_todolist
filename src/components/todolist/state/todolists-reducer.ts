import {FilterValuesType, TasksStateType, TodolistType} from "../../../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case'ADD-TODOLIST':
            const newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            const changedTodolist = state.find(tl => tl.id === action.id)
            if (changedTodolist) changedTodolist.title = action.title
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            const filteredTodolist = state.find(tl => tl.id === action.id)
            if (filteredTodolist) filteredTodolist.filter = action.filter
            return [...state]
        default:
            // throw new Error('ERROR! Unknown action type!')
            return state
    }
}


export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST' as const, id: todolistId}
}

export const AddTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST' as const,
        title: newTitle,
        todolistId: v1()
    }
}

export const ChangeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        title: newTitle,
        id: todolistId
    }
}

export const ChangeTodolistFilterAC = (todolistId: string, newFilterValue: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId,
        filter: newFilterValue
    }
}