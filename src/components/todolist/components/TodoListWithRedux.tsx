import React from "react";
import {TodoListTitle} from "./TodoListTitle";
import {FilterValuesType, TaskType} from "../../../App";
import {S} from './_styles'
import {CloseTodoListButton} from "./CloseTodoListButton";
import {FilterButtons} from "./FilterButtons";
import {TasksList} from "./TasksList";
import {AddItemForm} from "./AddItemForm";
import {Button, Stack, TextField} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TodolistType} from "../../../AppWithRedux";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "../state/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "../state/todolists-reducer";
import {FilterButtonsWithRedux} from "./FilterButtonsWithRedux";

// type TodoListPropsType = {
//     todolistId: string
//     title: string
//     tasks: TaskType[]
//     removeTask: (taskId: string, todolistId: string) => void
//     removeTodolist: (todolistId: string) => void
//     addTask: (newTitle: string, todolistId: string) => void
//     changeTodoListFilter: (filter: FilterValuesType, todolistId: string) => void
//     changeStatus: (id: string, isDone: boolean, todolistId: string) => void
//     changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
//     changeTodolistTitle: (newTitle: string, todolistId: string) => void
//     filter: FilterValuesType
// }

type TodoListPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
}


export const TodoListWithRedux = (props: TodoListPropsType) => {

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(AddTaskAC(props.todolistId, title))
    }

    // const getFilteredTasks = (tasks: Array<TaskType>, currentFilter: FilterValuesType): Array<TaskType> => {
    //     switch (currentFilter) {
    //         case 'active' :
    //             return tasks.filter(t => !t.isDone)
    //         case 'completed':
    //             return tasks.filter(t => t.isDone)
    //         default:
    //             return tasks
    //     }
    // }

    const removeTodolist = () => dispatch(RemoveTodolistAC(props.todolistId))
    const changeTodolistTitle = (title: string) => dispatch(ChangeTodolistTitleAC(props.todolistId, title))
    const removeTask = (taskId: string, todolistId: string) => dispatch(RemoveTaskAC(todolistId, taskId))
    const changeTaskTitle = (id: string, newValue: string, todolistId: string) => dispatch(ChangeTaskTitleAC(todolistId, id, newValue))
    const changeStatus = (id: string, isDone: boolean, todolistId: string) => dispatch(ChangeTaskStatusAC(todolistId, id, isDone))

    if (props.filter === 'active') {
        tasks = tasks.filter(t => t.isDone === false)
    } else if (props.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone === true)
    }

    return (
        <S.StyledTodolist>
            {/*<CloseTodoListButton removeTodolist={props.removeTodolist} todolistId={props.todolistId}/>*/}
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Button color={"secondary"} variant="text" startIcon={<DeleteIcon/>} onClick={() => removeTodolist()}>Delete</Button>
            </Stack>
            <FilterButtonsWithRedux filter={props.filter}
                                    todolistId={props.todolistId}/>
            <TodoListTitle title={props.title} todolistId={props.todolistId} changeTodolistTitle={changeTodolistTitle}/>
            <AddItemForm addItem={addTask} placeholder={'New task'} variant={'outlined'}/>
            <S.StyledTasksTitle>Task list</S.StyledTasksTitle>
            <TasksList tasks={tasks} removeTask={removeTask} changeStatus={changeStatus}
                       todolistId={props.todolistId} changeTaskTitle={changeTaskTitle}/>
        </S.StyledTodolist>
    )
}







