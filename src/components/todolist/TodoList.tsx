import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./todolist_Components/Button";
import {TodoListHeader} from "./todolist_Components/TodoListHeader";
import {Task} from "./todolist_Components/Task";
import {FilterValuesType, TaskType} from "../../App";
import {S} from './_styles'

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    addTask: (newTitle: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}


export const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setError(null)
        setNewTaskTitle(event.currentTarget.value)
    }

    function onKeyUpHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.code === 'Enter') {
            addTaskHandler()
        }
    }

    function addTaskHandler() {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            return
        }
        props.addTask(newTaskTitle.trim())
        setNewTaskTitle('')
    }

    function onAllClickHandler() {
        props.changeTodoListFilter('all')
    }

    function onActiveClickHandler() {
        props.changeTodoListFilter('active')
    }

    function onCompletedClickHandler() {
        props.changeTodoListFilter('completed')
    }


    const tasksList = props.tasks.length === 0
        ? <S.StyleEmpty>No any tasks yet</S.StyleEmpty>
        : props.tasks.map((task: TaskType) => {
            return (
                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <Task taskId={task.id} title={task.title} isDone={task.isDone} removeTask={props.removeTask}
                          changeStatus={props.changeStatus}/>
                </li>
            )
        })


    return (
        <S.StyledTodolist>

            <S.StyledButtonClose>
                <Button title={'X'}/>
            </S.StyledButtonClose>

            <S.StyledFilterButtonBlock>
                <Button title={'All'} onClickHandler={onAllClickHandler} currentFilter={props.filter}
                        expectedFilter={'all'}/>
                <Button title={'Active'} onClickHandler={onActiveClickHandler} currentFilter={props.filter}
                        expectedFilter={'active'}/>
                <Button title={'Completed'} onClickHandler={onCompletedClickHandler} currentFilter={props.filter}
                        expectedFilter={'completed'}/>
            </S.StyledFilterButtonBlock>

            <S.StyledHeader>
                <TodoListHeader title={props.title}/>
            </S.StyledHeader>

            <S.StyledInputBlock>
                <S.StyledInput
                    placeholder={'New task'}
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyUpHandler}
                />
                <Button
                    title={'+'}
                    onClickHandler={() => {
                        addTaskHandler()
                    }
                    }/>
                {error && <div className={'error-message'}>{error}</div>}
            </S.StyledInputBlock>

            <S.StyledTaskListHeader>Task list</S.StyledTaskListHeader>
            <S.StyledTaskList>
                {tasksList}
            </S.StyledTaskList>


        </S.StyledTodolist>
    )
}







