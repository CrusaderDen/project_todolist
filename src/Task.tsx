import React from 'react';
import {Button} from "./Button";
import styled from "styled-components";


type TaskPropsType = {
    taskId: number
    title: string
    isDone: boolean
    removeTask: (taskId: number) => void
}

export const Task = ({taskId, title, isDone, removeTask}: TaskPropsType) => {
    return (
        <StyledTask>
            <span>
                <input type="checkbox" defaultChecked={isDone}/>
                <span>{title}</span>
            </span>
            <Button title={'x'} taskId={taskId} onClickHandler={() => {
                removeTask(taskId)
            }}/>
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
