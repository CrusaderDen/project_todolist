import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import {IconButton, Stack, TextField, TextFieldVariants} from "@mui/material";
import {api} from "./api/api";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    placeholder: string
    variant: TextFieldVariants | undefined
}


export const AddTodolistForm = memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [ids, setIds] = useState([])

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
            <div style={{width: '80%', display: 'inline-block'}}>

                <TextField
                    fullWidth
                    // id="outlined-basic"
                    label={props.placeholder}
                    variant={props.variant}
                    color="secondary"
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyUpHandler}
                    error={!!error}
                    helperText={error}
                />
            </div>
            <IconButton size="large" color="secondary" aria-label="add an alarm" onClick={() => addTaskHandler()}>
                <AddBoxOutlinedIcon fontSize="large"/>
            </IconButton>
        </Stack>
    )
})