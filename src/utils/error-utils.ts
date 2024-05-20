import {setAppErrorAC, setAppErrorActionType, setAppStatusAC, setAppStatusActionType} from "../app/appReducer";
import {TaskResponseType} from "../api/api";
import {Dispatch} from "redux";

export const handleServerAppError = <T>(data: TaskResponseType<T>, dispatch: Dispatch<setAppStatusActionType | setAppErrorActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Sorry. Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<setAppStatusActionType | setAppErrorActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}