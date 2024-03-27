import React, {ChangeEvent} from 'react';
import {UniversalButton} from "./UniversalButton";
import {S} from '../_styles'
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type TaskPropsType = {
    todolistId: string
    taskId: string
    title: string
    isDone: boolean
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}

export const Task = (props: TaskPropsType) => {


    function onRemoveHandler() {
        props.removeTask(props.taskId, props.todolistId)
    }

    function onChangeStatusHandler(e: ChangeEvent<HTMLInputElement>) {
        props.changeStatus(props.taskId, e.currentTarget.checked, props.todolistId)
    }

    function onChangeTitleHandler(newValue: string) {
        props.changeTaskTitle(props.taskId, newValue, props.todolistId)
    }


    return (
        <S.StyledTask>
            <span>
                <Checkbox
                    checked={props.isDone}
                    onChange={onChangeStatusHandler}
                    color="secondary"
                    size={"medium"}
                />
                <EditableSpan title={props.title} isDone={props.isDone} onChange={onChangeTitleHandler}/>
            </span>
            {/*<UniversalButton title={'x'} taskId={props.taskId} onClickHandler={onRemoveHandler}/>*/}
            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <DeleteIcon/>
            </IconButton>
        </S.StyledTask>
    );
};

