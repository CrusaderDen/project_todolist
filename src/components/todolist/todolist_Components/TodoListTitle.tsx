import React from 'react';
import {S} from '../_styles'

type TodoListHeaderPropsType = {
    title: string
}

export const TodoListTitle = ({title}: TodoListHeaderPropsType) => {
    return (
        <S.StyledHeader>
            <S.StyledTaskTitle>{title}</S.StyledTaskTitle>
        </S.StyledHeader>
    );
};


