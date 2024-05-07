import React, {useCallback, useMemo} from "react";
import {TodoListTitle} from "./TodoListTitle";
import {S} from './_styles'
import {FilterButtons} from "./FilterButtons";
import {TasksList} from "./TasksList";
import {AddItemForm} from "./AddItemForm";
import {Button, Stack} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "../state/tasks-reducer";
import {ChangeTodolistTitleAC, RemoveTodolistAC} from "../state/todolists-reducer";
import {FilterValuesType, TaskType} from "../../../App";

type TodoListPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
}


export const TodoList = (props: TodoListPropsType) => {

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(AddTaskAC(props.todolistId, title))
    }, [props.todolistId, dispatch])

    const removeTodolist = () => dispatch(RemoveTodolistAC(props.todolistId))
    const changeTodolistTitle = (title: string) => dispatch(ChangeTodolistTitleAC(props.todolistId, title))
    const removeTask = useCallback((taskId: string, todolistId: string) => dispatch(RemoveTaskAC(todolistId, taskId)), [dispatch])
    const changeTaskTitle = useCallback((id: string, newValue: string, todolistId: string) => dispatch(ChangeTaskTitleAC(todolistId, id, newValue)), [dispatch])
    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => dispatch(ChangeTaskStatusAC(todolistId, id, isDone)), [dispatch])


    tasks = useMemo(() => {
        if (props.filter === 'active') {
            tasks = tasks.filter(t => !t.isDone)
        } else if (props.filter === 'completed') {
            tasks = tasks.filter(t => t.isDone)
        }
        return tasks
    }, [props.filter, tasks])


    return (
        <S.StyledTodolist>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Button color={"secondary"} variant="text" startIcon={<DeleteIcon/>} onClick={() => removeTodolist()}>Delete</Button>
            </Stack>
            <FilterButtons filter={props.filter}
                           todolistId={props.todolistId}/>
            <TodoListTitle title={props.title} todolistId={props.todolistId} changeTodolistTitle={changeTodolistTitle}/>
            <AddItemForm addItem={addTask} placeholder={'New task'} variant={'outlined'}/>
            <S.StyledTasksTitle>Task list</S.StyledTasksTitle>
            <TasksList tasks={tasks} removeTask={removeTask} changeStatus={changeStatus}
                       todolistId={props.todolistId} changeTaskTitle={changeTaskTitle}/>
        </S.StyledTodolist>
    )
}







