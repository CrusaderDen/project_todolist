import React, {ChangeEvent, memo, useCallback} from 'react';
import {UniversalButton} from "./UniversalButton";
import {S} from './_styles'
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from "../../../App";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}

export const Task = memo(({task, todolistId, removeTask, changeStatus, changeTaskTitle}: TaskPropsType) => {
    console.log('Task')
    const onRemoveHandler = () => removeTask(task.id, todolistId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeStatus(task.id, e.currentTarget.checked, todolistId)
    const onChangeTitleHandler = (newValue: string) => changeTaskTitle(task.id, newValue, todolistId)

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

