import {TodolistDomainType} from "./todolists-reducer";
import {TodoList} from "./Todolist/TodoList";
import React from "react";

type TodolistsListPropsType = {
    todolists: TodolistDomainType[]
}
export const TodolistsList = ({todolists}: TodolistsListPropsType) => {
    const todolistsRender = todolists.map(todoList => <TodoList
        key={todoList.id}
        todolistId={todoList.id}
        title={todoList.title}
        filter={todoList.filter}
        entityStatus={todoList.entityStatus}
    />)

    return (
        <>
            {todolistsRender}
        </>
    )
}