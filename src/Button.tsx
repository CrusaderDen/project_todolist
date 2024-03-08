import React from 'react';

type ButtonPropsType = {
    title: string
    taskId?: number
    onClickHandler?: () => void
}

export const Button = ({title, onClickHandler}: ButtonPropsType) => {

    // const onClickHandler = () => {
    //     if (props.title && props.removeTask && props.taskId) {
    //         props.removeTask(props.taskId)
    //     }
    //     if (props.addTask) {
    //         props.addTask()
    //     }
    // }

    return (
        <button onClick={onClickHandler}>{title}</button>
    );
};