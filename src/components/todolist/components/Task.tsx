import React, {ChangeEvent, memo, useCallback} from 'react';
import {S} from './_styles'
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "../state/tasks-reducer";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../../../App";

type TaskPropsType = {
    taskId: string
    todolistId: string
}

export const Task = memo(({taskId, todolistId}: TaskPropsType) => {

    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId].filter((t: { id: string; }) => t.id === taskId)[0] as TaskType)

    const dispatch = useDispatch()
    const onRemoveHandler = () => dispatch(RemoveTaskAC(todolistId, taskId))
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(ChangeTaskStatusAC(todolistId, taskId, e.currentTarget.checked))
    const onChangeTitleHandler = useCallback((title: string) => dispatch(ChangeTaskTitleAC(todolistId, taskId, title)), [dispatch, todolistId, taskId])

    return (
        <S.StyledTask>
            <span>
                <Checkbox
                    checked={task.isDone}
                    onChange={onChangeStatusHandler}
                    color="secondary"
                    size={"medium"}
                />
                <EditableSpan title={task.title} isDone={task.isDone} onChange={onChangeTitleHandler}/>
            </span>
            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <DeleteIcon/>
            </IconButton>
        </S.StyledTask>
    );
});

