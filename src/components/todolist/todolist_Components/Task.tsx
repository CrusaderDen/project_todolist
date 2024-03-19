import React, {ChangeEvent} from 'react';
import {UniversalButton} from "./UniversalButton";
import {S} from '../_styles'

type TaskPropsType = {
    taskId: string
    title: string
    isDone: boolean
    removeTask: (taskId: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

export const Task = (props: TaskPropsType) => {


    function onRemoveHandler() {
        props.removeTask(props.taskId)
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        props.changeStatus(props.taskId, e.currentTarget.checked)
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



