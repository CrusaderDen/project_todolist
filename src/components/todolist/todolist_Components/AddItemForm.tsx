import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import {IconButton, Stack, TextField, TextFieldVariants} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    placeholder: string
    variant: TextFieldVariants | undefined
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
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <div style={{width: '80%', display: 'inline-block'}}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label={props.placeholder}
                    variant={props.variant}
                    color="secondary"
                    value={title}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyUpHandler}
                />
            </div>
            <IconButton size="large" color="secondary" aria-label="add an alarm" onClick={() => addTaskHandler()}>
                <AddBoxOutlinedIcon fontSize="large"/>
            </IconButton>
            {/*<S.StyledInput*/}
            {/*    placeholder={'New task'}*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    onKeyUp={onKeyUpHandler}*/}
            {/*/>*/}
            {/*<UniversalButton*/}
            {/*    title={'+'}*/}
            {/*    onClickHandler={() => {*/}
            {/*        addTaskHandler()*/}
            {/*    }*/}
            {/*    }/>*/}
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </Stack>
    )
}