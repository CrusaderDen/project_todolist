import React, {ChangeEvent, memo, useState} from "react";

type EditableSpanPropsType = {
    title: string
    isDone?: boolean
    onChange: (newValue: string) => void
}

export const EditableField = memo((props: EditableSpanPropsType) => {
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

    const activateViewModeWithoutChanges = () => {
        setTitle('')
        setEditMode(false)
    }

    const onBlur = () => activateViewMode()
    const onKeyDown = (e: any) => {
        if (e.code === 'Enter' || e.code === "NumpadEnter") activateViewMode()
        if (e.code === "Escape") activateViewModeWithoutChanges()
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
        ? <input autoFocus onBlur={onBlur} onKeyDown={(e) => onKeyDown(e)} value={title} onChange={onChangeTitleHandler} style={inputStyles}/>
        : <span onDoubleClick={activateEditMode} className={props.isDone ? 'is-done' : ''}>{props.title}</span>
})