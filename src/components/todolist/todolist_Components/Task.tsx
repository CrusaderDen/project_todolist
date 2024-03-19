import React, {ChangeEvent} from 'react';
import {UniversalButton} from "./UniversalButton";
import {S} from '../_styles'

type TaskPropsType = {
    todoListId: string
    taskId: string
    title: string
    isDone: boolean
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
}

export const Task = (props: TaskPropsType) => {


    function onRemoveHandler() {
        props.removeTask(props.taskId, props.todoListId)
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        props.changeStatus(props.taskId, e.currentTarget.checked, props.todoListId)
    }


    return (
        <S.StyledTask>
            <span>
                <input
                    type="checkbox"
                    checked={props.isDone}
                    onChange={onChangeHandler}/>
                <span>{props.title}</span>
            </span>
            <UniversalButton title={'x'} taskId={props.taskId} onClickHandler={onRemoveHandler}/>
        </S.StyledTask>
    );
};



