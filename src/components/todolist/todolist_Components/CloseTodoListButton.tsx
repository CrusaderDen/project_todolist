import React from 'react';
import {S} from "../_styles";
import {UniversalButton} from "./UniversalButton";

type CloseTodoListButtonPropsType = {
    removeTodolist: (todolistId: string) => void
    todoListId: string
}

export const CloseTodoListButton = (props: CloseTodoListButtonPropsType) => {

    function onClickHandler() {
        props.removeTodolist(props.todoListId)
    }

    return (
        <S.StyledButtonClose>
            <UniversalButton title={'X'} onClickHandler={onClickHandler}/>
        </S.StyledButtonClose>
    );
};