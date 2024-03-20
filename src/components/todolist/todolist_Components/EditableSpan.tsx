import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    isDone: boolean
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState('')
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const inputStyles: object = {
        width: '150px',
        height: '20px',
        borderRadius: '5px',
        position: 'relative',
        top: '-2px',
    }
    return editMode
        ? <input autoFocus onBlur={activateViewMode} value={title} onChange={onChangeTitleHandler} style={inputStyles}/>
        : <span onDoubleClick={activateEditMode} className={props.isDone ? 'is-done' : ''}>{props.title}</span>
}