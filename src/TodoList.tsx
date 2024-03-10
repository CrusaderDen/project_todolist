import React, {ChangeEvent, KeyboardEvent, useRef, useState} from "react";
import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader";
import {Task} from "./Task";
import {FilterValuesType, TaskType} from "./App";
import styled from "styled-components";


type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    addTask: (newTitle: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}


export const TodoList = ({
                             title,
                             tasks,
                             removeTask,
                             addTask,
                             changeTodoListFilter,
                             changeStatus,
                             filter,
                         }: TodoListPropsType) => {

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
        addTask(newTaskTitle.trim())
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
                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <Task taskId={task.id} title={task.title} isDone={task.isDone} removeTask={removeTask}
                          changeStatus={changeStatus}/>
                </li>
            )
        })


    // const [todoHeight, setTodoHeight] = useState<number>(0)
    //
    let todoListRef = useRef<any>()
    // useEffect(() => {
    //     setTodoHeight(todoListRef.current.getBoundingClientRect().height);
    // }, [todoListRef]);


    return (
        <StyledTodolist ref={todoListRef} onResize={() => {
        }}>

            <StyledButtonClose>
                <Button title={'X'}/>
            </StyledButtonClose>

            <StyledHeader>
                <TodoListHeader title={title}/>
            </StyledHeader>

            <StyledInputBlock>
                <StyledInput
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
            </StyledInputBlock>

            <StyledTaskListHeader>Task list</StyledTaskListHeader>
            <StyledTaskList>
                {tasksList}
            </StyledTaskList>

            <StyledButtonBlock>
                <Button title={'All'} onClickHandler={onAllClickHandler} currentFilter={filter}
                        expectedFilter={'all'}/>
                <Button title={'Active'} onClickHandler={onActiveClickHandler} currentFilter={filter}
                        expectedFilter={'active'}/>
                <Button title={'Completed'} onClickHandler={onCompletedClickHandler} currentFilter={filter}
                        expectedFilter={'completed'}/>
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

const StyledInput = styled.input`
    height: 30px;
    width: 100%;
    border-radius: 5px;
    border: none;
    padding-left: 5px;

    &:focus {
        outline: none;
        border: none;
    }

        // border: ${'2px solid red'};
        // z-index: ${2};
`


const StyledButtonBlock = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;

    & button {
        min-width: 81px;
        height: 25px;
        font-weight: 700;
        transition: transform 0.1s ease-in, background-color 0.1s ease-in;

        &:hover {
            transform: scale(1.05);
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




