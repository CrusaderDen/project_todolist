import React from "react";
import {TodoListTitle} from "./todolist_Components/TodoListTitle";
import {FilterValuesType, TaskType} from "../../App";
import {S} from './_styles'
import {CloseTodoListButton} from "./todolist_Components/CloseTodoListButton";
import {FilterButtons} from "./todolist_Components/FilterButtons";
import {TasksList} from "./todolist_Components/TasksList";
import {AddItemForm} from "./todolist_Components/AddItemForm";
import {Button, Stack, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type TodoListPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    addTask: (newTitle: string, todolistId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
    filter: FilterValuesType
}


export const TodoList = (props: TodoListPropsType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    return (
        <S.StyledTodolist>
            {/*<CloseTodoListButton removeTodolist={props.removeTodolist} todolistId={props.todolistId}/>*/}
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Button color={"secondary"} variant="text" startIcon={<DeleteIcon/>} onClick={() => props.removeTodolist(props.todolistId)}>Delete</Button>
            </Stack>
            <FilterButtons changeTodoListFilter={props.changeTodoListFilter} filter={props.filter}
                           todolistId={props.todolistId}/>
            <TodoListTitle title={props.title} todolistId={props.todolistId} changeTodolistTitle={props.changeTodolistTitle}/>
            <AddItemForm addItem={addTask} placeholder={'New task'} variant={'outlined'}/>
            <S.StyledTasksTitle>Task list</S.StyledTasksTitle>
            <TasksList tasks={props.tasks} removeTask={props.removeTask} changeStatus={props.changeStatus}
                       todolistId={props.todolistId} changeTaskTitle={props.changeTaskTitle}/>
        </S.StyledTodolist>
    )
}







