import React from 'react';
import {S} from "../_styles";
import {TaskType} from "../../../App";
import {Task} from "./Task";

type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
}

export const TasksList = (props: TasksListPropsType) => {

    const tasksList = props.tasks.length === 0
        ? <S.StyleEmpty>No any tasks yet</S.StyleEmpty>
        : props.tasks.map((task: TaskType) => {
            return (
                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <Task taskId={task.id} title={task.title} isDone={task.isDone} removeTask={props.removeTask}
                          changeStatus={props.changeStatus} todoListId={props.todoListId}/>
                </li>
            )
        })

    return (
        <S.StyledTaskList>
            {tasksList}
        </S.StyledTaskList>
    );
};