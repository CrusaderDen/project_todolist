import React from 'react';

type ButtonPropsType = {
    title: string
    taskId?: number
    removeTask?: (taskId: number) => void
}

export const Button = (props: ButtonPropsType) => {

    const onClickHandler = () => {
        if (props.title && props.removeTask && props.taskId) {
            props.removeTask(props.taskId)
        }
    }

    return (
        <button onClick={onClickHandler}>{props.title}</button>
    );
};