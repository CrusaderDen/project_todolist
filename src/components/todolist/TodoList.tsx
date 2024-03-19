import React from "react";
import {TodoListTitle} from "./todolist_Components/TodoListTitle";
import {FilterValuesType, TaskType} from "../../App";
import {S} from './_styles'
import {CloseTodoListButton} from "./todolist_Components/CloseTodoListButton";
import {FilterButtons} from "./todolist_Components/FilterButtons";
import {InputTaskField} from "./todolist_Components/InputTaskField";
import {TasksList} from "./todolist_Components/TasksList";

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    addTask: (newTitle: string, todolistId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
}


export const TodoList = (props: TodoListPropsType) => {

    return (
        <S.StyledTodolist>
            <CloseTodoListButton removeTodolist={props.removeTodolist} todoListId={props.todoListId}/>
            <FilterButtons changeTodoListFilter={props.changeTodoListFilter} filter={props.filter}
                           todoListId={props.todoListId}/>
            <TodoListTitle title={props.title}/>
            <InputTaskField addTask={props.addTask} todoListId={props.todoListId}/>
            <S.StyledTasksTitle>Task list</S.StyledTasksTitle>
            <TasksList tasks={props.tasks} removeTask={props.removeTask} changeStatus={props.changeStatus}
                       todoListId={props.todoListId}/>
        </S.StyledTodolist>
    )
}







