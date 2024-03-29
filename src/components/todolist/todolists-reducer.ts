import {FilterValuesType, TodolistType} from "../../App";


type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    id: string
    title: string
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

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case'ADD-TODOLIST':
            const newTodolist: TodolistType = {id: action.id, title: action.title, filter: 'all'}
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
            throw new Error('ERROR! Unknown action type!')
    }
}


export const RemoveTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST' as const, id: todolistId}
}

export const AddTodolistAC = (newTodolistId: string, newTitle: string) => {
    return {
        type: 'ADD-TODOLIST' as const,
        id: newTodolistId,
        title: newTitle
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