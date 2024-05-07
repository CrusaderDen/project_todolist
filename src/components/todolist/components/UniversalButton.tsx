import React from 'react';
import {S} from './_styles'
import {FilterValuesType} from "../../../App";

type ButtonPropsType = {
    title: string
    taskId?: string
    onClickHandler?: () => void
    currentFilter?: FilterValuesType
    expectedFilter?: string
}

export const UniversalButton = (props: ButtonPropsType) => {
    return (
        <S.StyledButton
            onClick={props.onClickHandler}
            filter={props.currentFilter}
            $expectedFilter={props.expectedFilter}
            title={props.title}
        >
            <span>{props.title}</span>
        </S.StyledButton>
    );
};



