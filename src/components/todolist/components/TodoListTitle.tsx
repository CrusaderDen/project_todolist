import React from 'react';
import {S} from './_styles'
import {EditableSpan} from "./EditableSpan";

type TodoListHeaderPropsType = {
    title: string
    todolistId: string
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export const TodoListTitle = (props: TodoListHeaderPropsType) => {
    function onChangeTitleHandler(newValue: string) {
        props.changeTodolistTitle(newValue, props.todolistId)
    }

    return (
        <S.StyledHeader>
            <S.StyledTaskTitle>
                <EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
            </S.StyledTaskTitle>
        </S.StyledHeader>
    );
};


