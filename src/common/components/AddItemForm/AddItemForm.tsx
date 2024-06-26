import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import {IconButton, Stack, TextField, TextFieldVariants} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    placeholder: string
    variant: TextFieldVariants | undefined
    disabled?: boolean
}


export const AddItemForm = memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.currentTarget.value)
        setError('')
    }

    function onKeyUpHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (error) setError(null)
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
            <div style={{width: '80%', display: 'inline-block', margin: '30px'}}>

                <TextField
                    fullWidth
                    label={props.placeholder}
                    variant={props.variant}
                    color="secondary"
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyUpHandler}
                    error={!!error}
                    helperText={error}
                    disabled={props.disabled}
                />
            </div>
            <IconButton
                size="large"
                color="secondary"
                aria-label="add an alarm"
                disabled={props.disabled}
                onClick={() => addTaskHandler()}
            >
                <AddBoxOutlinedIcon fontSize="large"/>
            </IconButton>
        </Stack>
    )
})