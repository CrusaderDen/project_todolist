import React, {useCallback} from 'react';
import {S} from './TodolistStyles'
import {EditableField} from "../../../components/EditableField/EditableField";

type TodoListHeaderPropsType = {
    title: string
    todolistId: string
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const TodoListTitle = (props: TodoListHeaderPropsType) => {

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTodolistTitle(newValue, props.todolistId)
    }, [props.todolistId])

    return (
        <S.StyledHeader>
            <S.StyledTaskTitle>
                <EditableField title={props.title} onChange={onChangeTitleHandler}/>
            </S.StyledTaskTitle>
        </S.StyledHeader>
    );
};


