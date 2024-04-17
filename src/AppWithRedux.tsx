import React from 'react';
import './App.css';
import {AddItemForm} from "./components/todolist/components/AddItemForm";
import {AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./components/todolist/state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./components/todolist/state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./components/todolist/state/store";
import {TodoListWithRedux} from "./components/todolist/components/TodoListWithRedux";

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

function AppWithRedux() {


    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    // const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTodolist = (title: string) => dispatch(AddTodolistAC(title))

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} placeholder={'Create a new todolist'} variant={"standard"}/>
            {todolists.map(todoList => {
                // let allTodolistTasks = tasks[todoList.id]

                return <TodoListWithRedux
                    key={todoList.id}
                    todolistId={todoList.id}
                    title={todoList.title}
                    filter={todoList.filter}
                />
            })}
        </div>
    );
}

export default AppWithRedux;
