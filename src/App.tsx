import React, {useCallback} from 'react';
import './App.css';
import {AddTodolistForm} from "./AddTodolistForm";
import {AddTodolistAC} from "./components/todolist/state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./components/todolist/state/store";
import {TodoList} from "./components/todolist/components/TodoList";
import {Clock} from "./components/clock/Clock";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {


    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = useCallback((title: string) => dispatch(AddTodolistAC(title)), [dispatch])

    return (
        <div className="App">
            <Clock/>
            <AddTodolistForm addItem={addTodolist} placeholder={'Create a new todolist'} variant={"standard"}/>
            {todolists.map(todoList => {

                return <TodoList
                    key={todoList.id}
                    todolistId={todoList.id}
                    title={todoList.title}
                    filter={todoList.filter}
                />
            })}
        </div>
    );
}

export default App;
