import React, {ChangeEvent, memo, useCallback} from 'react';
import {UniversalButton} from "./UniversalButton";
import {S} from './_styles'
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {TasksStateType, TaskType} from "../../../App";
import {useDispatch, useSelector} from "react-redux";
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "../state/tasks-reducer";
import {AppRootStateType} from "../state/store";

type TaskPropsType = {
    taskId: string
    todolistId: string
}

export const TaskWithRedux = memo(({taskId, todolistId}: TaskPropsType) => {
    console.log('Task')

    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId].filter(t => t.id === taskId)[0])

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

