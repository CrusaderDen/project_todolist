import React, {useMemo} from 'react';
import {S} from "./_styles";
import {Task} from "./Task";
import {FilterValuesType, TaskType} from "../../../App";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";

type TasksListPropsType = {
    todolistId: string
    filter: FilterValuesType
}

export const TasksList = (props: TasksListPropsType) => {
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])

    tasks = useMemo(() => {
        if (props.filter === 'active') {
            tasks = tasks.filter(t => !t.isDone)
        } else if (props.filter === 'completed') {
            tasks = tasks.filter(t => t.isDone)
        }
        return tasks
    }, [props.filter, tasks])

    const tasksList = tasks.length === 0
        ? <S.StyleEmpty>No any tasks yet</S.StyleEmpty>
        : tasks.map((task: TaskType) => <li key={task.id}><Task todolistId={props.todolistId} taskId={task.id}/></li>)

    return <S.StyledTaskList> {tasksList} </S.StyledTaskList>
}