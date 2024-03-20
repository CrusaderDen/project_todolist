import React, {ChangeEvent} from 'react';
import {UniversalButton} from "./UniversalButton";
import {S} from '../_styles'

type TaskPropsType = {
    todolistId: string
    taskId: string
    title: string
    isDone: boolean
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
}

export const Task = (props: TaskPropsType) => {


    function onRemoveHandler() {
        props.removeTask(props.taskId, props.todolistId)
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        props.changeStatus(props.taskId, e.currentTarget.checked, props.todolistId)
    }


    return (
        <S.StyledTask>
            <span>
                <input
                    type="checkbox"
                    checked={props.isDone}
                    onChange={onChangeHandler}/>
                <span className={props.isDone ? 'is-done' : ''}>{props.title}</span>
            </span>
            <UniversalButton title={'x'} taskId={props.taskId} onClickHandler={onRemoveHandler}/>
        </S.StyledTask>
    );
};



