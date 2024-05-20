import React, {useCallback, useEffect} from "react";
import "./App.css";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {createTodolistTC, getTodolistsTC, TodolistDomainType,} from "../features/Todolists/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {Clock} from "../components/Clock/Clock";
import {TodolistsList} from "../features/Todolists/TodolistsLists";
import LinearProgress from '@mui/material/LinearProgress'
import {Box} from "@mui/material";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {RequestStatusType} from "./appReducer";

function App() {

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(
        (state) => state.todolists,
    )

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const dispatch = useDispatch();

    const addTodolist = useCallback((title: string) => {
    // @ts-ignore
        dispatch(createTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        // @ts-ignore
        dispatch(getTodolistsTC());
    }, []);

    return (
        <div className="App">
            <ErrorSnackBar/>
            <Box sx={{ width: '100vw'}}>
                {status === 'loading' && <LinearProgress color="secondary" sx={{height: '10px'}}/>}
            </Box>
            <Clock/>
            <AddItemForm
                addItem={addTodolist}
                placeholder={"Create a new todolist"}
                variant={"standard"}
                disabled={status==='loading'}
            />
            <TodolistsList todolists={todolists}/>
        </div>
    );
}


export default App;
