import React, {useCallback} from 'react';
import {S} from './_styles'
import {EditableSpan} from "./EditableSpan";

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
                <EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
            </S.StyledTaskTitle>
        </S.StyledHeader>
    );
};


