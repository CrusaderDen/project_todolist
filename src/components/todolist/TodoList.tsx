import React from "react";
import {TodoListTitle} from "./todolist_Components/TodoListTitle";
import {FilterValuesType, TaskType} from "../../App";
import {S} from './_styles'
import {CloseTodoListButton} from "./todolist_Components/CloseTodoListButton";
import {FilterButtons} from "./todolist_Components/FilterButtons";
import {InputTaskField} from "./todolist_Components/InputTaskField";
import {TasksList} from "./todolist_Components/TasksList";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    addTask: (newTitle: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}


export const TodoList = (props: TodoListPropsType) => {

    return (
        <S.StyledTodolist>
            <CloseTodoListButton/>
            <FilterButtons changeTodoListFilter={props.changeTodoListFilter} filter={props.filter}/>
            <TodoListTitle title={props.title}/>
            <InputTaskField addTask={props.addTask}/>
            <S.StyledTasksTitle>Task list</S.StyledTasksTitle>
            <TasksList tasks={props.tasks} removeTask={props.removeTask} changeStatus={props.changeStatus}/>
        </S.StyledTodolist>
    )
}







