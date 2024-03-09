import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader";
import {Task} from "./Task";
import {FilterValuesType, TaskType} from "./App";
import styled from "styled-components";
import * as diagnostics_channel from "diagnostics_channel";


type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    addTask: (newTitle: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    changeStatus: (id: string, isDone: boolean) => void
}


export const TodoList = ({
                             title,
                             tasks,
                             removeTask,
                             addTask,
                             changeTodoListFilter,
                             changeStatus
                         }: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(event.currentTarget.value)
    }

    function onKeyUpHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.code === 'Enter') {
            addTaskHandler()
        }
    }

    function addTaskHandler() {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    function onAllClickHandler() {
        changeTodoListFilter('all')
    }

    function onActiveClickHandler() {
        changeTodoListFilter('active')
    }

    function onCompletedClickHandler() {
        changeTodoListFilter('completed')
    }


    const tasksList = tasks.length === 0
        ? <StyleEmpty>No any tasks yet</StyleEmpty>
        : tasks.map((task: TaskType) => {
            return (
                <li key={task.id}>
                    <Task taskId={task.id} title={task.title} isDone={task.isDone} removeTask={removeTask}
                          changeStatus={changeStatus}/>
                </li>
            )
        })


    return (
        <StyledTodolist>

            <StyledButtonClose>
                <Button title={'X'}/>
            </StyledButtonClose>

            <StyledHeader>
                <TodoListHeader title={title}/>
            </StyledHeader>

            <StyledInputBlock>
                <input
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
            </StyledInputBlock>

            <StyledTaskListHeader>Task list</StyledTaskListHeader>
            <StyledTaskList>
                {tasksList}
            </StyledTaskList>

            <StyledButtonBlock>
                <Button title={'All'} onClickHandler={onAllClickHandler}/>
                <Button title={'Active'} onClickHandler={onActiveClickHandler}/>
                <Button title={'Completed'} onClickHandler={onCompletedClickHandler}/>
            </StyledButtonBlock>

        </StyledTodolist>
    )
}

const StyledTodolist = styled.div`
    background-image: linear-gradient(160deg, rgba(33, 212, 253, 0.8) 0%, rgba(183, 33, 255, 0.8) 100%);
    box-shadow: 10px 10px 20px rgba(18, 107, 120, 0.9);
    border-radius: 5px;
    padding: 20px;
    min-width: 250px;

`

const StyledHeader = styled.div`
    position: relative;
`
const StyledTaskList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 30px;
    border: 2px inset black;
    padding: 10px;
    margin: 20px 0;

    & li {
        list-style: none;
    }
`

const StyledButtonClose = styled.div`
    text-align: right;
`
const StyledInputBlock = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin: 20px 0;

    & input {
        height: 30px;
        width: 100%;
        border-radius: 5px;
        border: none;
        padding-left: 5px;

        &:focus {
            outline: none;
            border: none;
        }
    }

    & button {
        //display: none;
        position: absolute;
        right: 0;
        height: 30px;
        width: 30px;
        border: none;
        border-left: 1px solid #cfcfcf;
        border-radius: 0 5px 5px 0;
        background-color: white;
        transition: all 0.3s;
        font-weight: 500;
        font-size: 24px;

        &:hover {
            background-color: #cfcfcf;
        }
    }
`

const StyledButtonBlock = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;

    & button {
        min-width: 81px;
        height: 25px;
        font-weight: 700;
        transition: all 0.3s ease-in-out;

        &:hover {
            transform: scale(1.15);
        }
    }
`

const StyleEmpty = styled.span`
    text-align: center;
`

const StyledTaskListHeader = styled.h4`
    text-align: center;
    font-weight: 500;
    font-size: 18px;

`


