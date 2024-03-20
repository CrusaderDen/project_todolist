import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {S} from "../_styles";
import {UniversalButton} from "./UniversalButton";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setError(null)
        setTitle(event.currentTarget.value)
    }

    function onKeyUpHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            addTaskHandler()
        }
    }

    function addTaskHandler() {
        if (title.trim() === '') {
            setError('Title is required')
            return
        }
        props.addItem(title.trim())
        setTitle('')
    }

    return (
        <S.StyledInputBlock>
            <S.StyledInput
                placeholder={'New task'}
                value={title}
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