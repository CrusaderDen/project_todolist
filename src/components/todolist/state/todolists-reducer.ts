import {api, ServerTodolistType} from "../../../api/api"
import {Dispatch} from "redux"

//---------Reducer
export const todolistsReducer = (state: TodolistDomainType[] = [], action: ActionsType,): TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((tl) => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map((tl) =>
                tl.id === action.id ? {...tl, title: action.title} : tl,
            )
        case "CHANGE-TODOLIST-FILTER":
            return state.map((tl) =>
                tl.id === action.id ? {...tl, filter: action.filter} : tl,
            )
        case "SET-TODOLISTS":
            return action.todolists.map((tl) => ({...tl, filter: "all"}))
        default:
            return state
    }
}
//---------Action creators
export const RemoveTodolistAC = (todolistId: string,): RemoveTodolistActionType => ({type: "REMOVE-TODOLIST", id: todolistId}) as const
export const AddTodolistAC = (todolist: ServerTodolistType) => ({type: "ADD-TODOLIST", todolist}) as const
export const ChangeTodolistTitleAC = (id: string, title: string) => ({type: "CHANGE-TODOLIST-TITLE", title, id}) as const
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: "CHANGE-TODOLIST-FILTER", id, filter}) as const
export const SetTodolistsAC = (todolists: ServerTodolistType[]) => ({type: "SET-TODOLISTS", todolists}) as const
//---------AC Types
export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
//---------AC Types for export
export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    todolist: ServerTodolistType
}
export type SetTodolistsActionType = {
    type: "SET-TODOLISTS"
    todolists: ServerTodolistType[]
}
//---------State Types
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = ServerTodolistType & { filter: FilterValuesType }
//---------Thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    api.getTodolists().then((res) => {
            dispatch(SetTodolistsAC(res.data))
        }
    )
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    api.deleteTodolist(todolistId).then((res) => {
        dispatch(RemoveTodolistAC(todolistId))
    })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    api.createTodolist(title).then((res) => {
        dispatch(AddTodolistAC(res.data.data.item))
    })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    api.updateTodolistTitle(todolistId, title).then((res) => {
        dispatch(ChangeTodolistTitleAC(todolistId, title))
    })
}
