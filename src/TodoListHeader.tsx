import React from 'react';
import styled from "styled-components";


type TodoListHeaderPropsType = {
    title: string
}

export const TodoListHeader = ({title}: TodoListHeaderPropsType) => {
    return (
        <StyledTaskTitle>{title}</StyledTaskTitle>
    );
};

const StyledTaskTitle = styled.h3`
    text-align: center;
    margin: 10px 0;
`
