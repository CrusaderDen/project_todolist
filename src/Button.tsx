import React from 'react';
import styled, {css} from "styled-components";
import {FilterValuesType} from "./App";

type ButtonPropsType = {
    title: string
    taskId?: string
    onClickHandler?: () => void
    currentFilter?: FilterValuesType
    expectedFilter?: string
}

export const Button = (props: ButtonPropsType) => {
    return (
        <StyledButton
            onClick={props.onClickHandler}
            filter={props.currentFilter}
            $expectedFilter={props.expectedFilter}
            title={props.title}>{props.title}</StyledButton>
    );
};

const StyledButton = styled.button<any>`
    border-radius: 3px;
    border: none;
    ${props => props.filter === props.$expectedFilter && props.$expectedFilter !== undefined && css`
        background-color: #64caeb;
        color: #000000;
    `}
`

