import React, {useCallback, useEffect} from "react";
import "./App.css";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {createTodolistTC, fetchTodolistsTC, TodolistDomainType,} from "../features/Todolists/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {Clock} from "../components/Clock/Clock";
import {TodolistsList} from "../features/Todolists/TodolistsLists";

function App() {

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(
        (state) => state.todolists,
    )
    const dispatch = useDispatch();

    const addTodolist = useCallback((title: string) => {
    // @ts-ignore
        dispatch(createTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTodolistsTC());
    }, []);

    return (
        <div className="App">
            <Clock/>
            <AddItemForm addItem={addTodolist} placeholder={"Create a new todolist"} variant={"standard"}/>
            <TodolistsList todolists={todolists}/>
        </div>
    );
}


export default App;
