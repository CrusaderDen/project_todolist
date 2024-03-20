import React from 'react';
import {S} from "../_styles";
import {TaskType} from "../../../App";
import {Task} from "./Task";

type TasksListPropsType = {
    todolistId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}

export const TasksList = (props: TasksListPropsType) => {

    const tasksList = props.tasks.length === 0
        ? <S.StyleEmpty>No any tasks yet</S.StyleEmpty>
        : props.tasks.map((task: TaskType) => {
            return (
                <li key={task.id}>
                    <Task taskId={task.id} title={task.title} isDone={task.isDone} removeTask={props.removeTask}
                          changeStatus={props.changeStatus} todolistId={props.todolistId} changeTaskTitle={props.changeTaskTitle}/>
                </li>
            )
        })

    return (
        <S.StyledTaskList>
            {tasksList}
        </S.StyledTaskList>
    );
};