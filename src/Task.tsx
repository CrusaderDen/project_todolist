import React, {ChangeEvent, useState} from 'react';
import {Button} from "./Button";
import styled from "styled-components";


type TaskPropsType = {
    taskId: string
    title: string
    isDone: boolean
    removeTask: (taskId: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

export const Task = ({taskId, title, isDone, removeTask, changeStatus}: TaskPropsType) => {

    const [currentIsDone, setCurrentIsDone] = useState(isDone)

    function onRemoveHandler() {
        removeTask(taskId)
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        let change = e.currentTarget.checked
        changeStatus(taskId, change)
        setCurrentIsDone(change)
    }


    return (
        <StyledTask>
            <span>
                <input
                    type="checkbox"
                    checked={currentIsDone}
                    onChange={onChangeHandler}/>
                <span>{title}</span>
            </span>
            <Button title={'x'} taskId={taskId} onClickHandler={onRemoveHandler}/>
        </StyledTask>
    );
};


const StyledTask = styled.div`
    display: flex;
    justify-content: space-between;

    & span {
        & input {
            margin-right: 10px;
        }
    }

`
