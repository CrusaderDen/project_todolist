export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

const InitialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = InitialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
type ActionsType = setAppErrorActionType | setAppStatusActionType