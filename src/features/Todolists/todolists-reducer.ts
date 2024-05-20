import {api, ServerTodolistType} from "../../api/api"
import {Dispatch} from "redux"
import {RequestStatusType, setAppStatusAC, setAppStatusActionType} from "../../app/appReducer";

//---------Reducer
export const todolistsReducer = (state: TodolistDomainType[] = [], action: ActionsType,): TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((tl) => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map((tl) => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":
            return action.todolists.map((tl) => ({...tl, filter: "all", entityStatus: "idle"}))
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map((tl) => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        default:
            return state
    }
}

//---------Action creators
export const RemoveTodolistAC = (id: string,): RemoveTodolistActionType => ({type: "REMOVE-TODOLIST", id}) as const
export const AddTodolistAC = (todolist: ServerTodolistType) => ({type: "ADD-TODOLIST", todolist}) as const
export const ChangeTodolistTitleAC = (id: string, title: string) => ({type: "CHANGE-TODOLIST-TITLE", id, title}) as const
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: "CHANGE-TODOLIST-FILTER", id, filter}) as const
export const SetTodolistsAC = (todolists: ServerTodolistType[]) => ({type: "SET-TODOLISTS", todolists}) as const
export const ChangeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const)

//---------Thunks
export const getTodolistsTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    api.getTodolists().then((res) => {
            dispatch(SetTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        }
    )
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(ChangeTodolistEntityStatusAC(todolistId, 'loading'))
    api.deleteTodolist(todolistId).then((res) => {
        dispatch(RemoveTodolistAC(todolistId))
        dispatch(setAppStatusAC('succeeded'))
    })
}

export const createTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    api.createTodolist(title).then((res) => {
        dispatch(AddTodolistAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
    })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    api.updateTodolistTitle(todolistId, title).then((res) => {
        dispatch(ChangeTodolistTitleAC(todolistId, title))
    })
}

//---------Types
export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | ReturnType<typeof ChangeTodolistEntityStatusAC>

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

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = ServerTodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType }

type ThunkDispatch = Dispatch<ActionsType | setAppStatusActionType>
