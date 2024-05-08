import React, {ChangeEvent, memo, useCallback} from 'react';
import {S} from './_styles'
import {EditableField} from "./EditableField";
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

    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId].filter((t: { id: string }) => t.id === taskId)[0])
    const dispatch = useDispatch()

    const onRemoveHandler = useCallback(() => dispatch(RemoveTaskAC(todolistId, taskId)), [dispatch])
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => dispatch(ChangeTaskStatusAC(todolistId, taskId, e.currentTarget.checked)), [dispatch])
    const onChangeTitleHandler = useCallback((title: string) => dispatch(ChangeTaskTitleAC(todolistId, taskId, title)), [dispatch])


    return (
        <S.StyledTask>
            <span>
                <Checkbox
                    checked={task.isDone}
                    onChange={onChangeStatusHandler}
                    color="secondary"
                    size={"medium"}
                />
                <EditableField title={task.title} isDone={task.isDone} onChange={onChangeTitleHandler}/>
            </span>
            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <DeleteIcon/>
            </IconButton>
        </S.StyledTask>
    );
});

