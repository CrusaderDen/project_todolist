import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {UniversalButton} from "./UniversalButton";
import {S} from "../_styles";


type InputTaskFieldPropsType = {
    todoListId: string
    addTask: (newTitle: string, todolistId: string) => void
}

export const InputTaskField = (props: InputTaskFieldPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setError(null)
        setNewTaskTitle(event.currentTarget.value)
    }

    function onKeyUpHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            addTaskHandler()
        }
    }

    function addTaskHandler() {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            return
        }
        props.addTask(newTaskTitle.trim(), props.todoListId)
        setNewTaskTitle('')
    }

    return (
        <S.StyledInputBlock>
            <S.StyledInput
                placeholder={'New task'}
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}
            />
            <UniversalButton
                title={'+'}
                onClickHandler={() => {
                    addTaskHandler()
                }
                }/>
            {error && <div className={'error-message'}>{error}</div>}
        </S.StyledInputBlock>
    )
}