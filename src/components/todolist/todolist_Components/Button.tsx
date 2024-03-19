import React from 'react';
import {FilterValuesType} from "../../../App";
import {S} from '../_styles'

type ButtonPropsType = {
    title: string
    taskId?: string
    onClickHandler?: () => void
    currentFilter?: FilterValuesType
    expectedFilter?: string
}

export const Button = (props: ButtonPropsType) => {
    return (
        <S.StyledButton
            onClick={props.onClickHandler}
            filter={props.currentFilter}
            $expectedFilter={props.expectedFilter}
            title={props.title}>{props.title}
        </S.StyledButton>
    );
};



