import React from 'react';
import {S} from "../_styles";
import {UniversalButton} from "./UniversalButton";

export const CloseTodoListButton = () => {
    return (
        <S.StyledButtonClose>
            <UniversalButton title={'X'}/>
        </S.StyledButtonClose>
    );
};