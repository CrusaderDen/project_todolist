import React from 'react';
import {S} from '../_styles'

type TodoListHeaderPropsType = {
    title: string
}

export const TodoListHeader = ({title}: TodoListHeaderPropsType) => {
    return (
        <S.StyledTaskTitle>{title}</S.StyledTaskTitle>
    );
};


