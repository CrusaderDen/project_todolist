import React from 'react';
import {S} from "./TodolistStyles";
import {UniversalButton} from "../../../components/UniversalButton/UniversalButton";

type CloseTodoListButtonPropsType = {
    removeTodolist: (todolistId: string) => void
    todolistId: string
}

export const CloseTodoListButton = (props: CloseTodoListButtonPropsType) => {

    function onClickHandler() {
        props.removeTodolist(props.todolistId)
    }

    return (
        <S.StyledButtonClose>
            <UniversalButton title={'X'} onClickHandler={onClickHandler}/>
        </S.StyledButtonClose>
    );
};