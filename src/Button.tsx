import React from 'react';

type ButtonPropsType = {
    title: string
    taskId?: string
    onClickHandler?: () => void
}

export const Button = ({title, onClickHandler}: ButtonPropsType) => {
    return (
        <button onClick={onClickHandler}>{title}</button>
    );
};