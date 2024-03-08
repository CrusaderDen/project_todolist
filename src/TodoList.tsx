import React from "react";
import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader";
import {Task} from "./Task";
import {TaskType} from "./App";
import styled from "styled-components";
import * as diagnostics_channel from "diagnostics_channel";


type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
}


export const TodoList = ({title, tasks, removeTask}: TodoListPropsType) => {

    const tasksList = tasks.length === 0
        ? <StyleEmpty>Список пуст</StyleEmpty>
        : tasks.map((task: TaskType) => {
            return (
                <li key={task.id}>
                    <Task taskId={task.id} title={task.title} isDone={task.isDone} removeTask={removeTask}/>
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
                <input/>
                <Button title={'+'}/>
            </StyledInputBlock>

            <StyledTaskList>
                {tasksList}
            </StyledTaskList>
            
            <StyledButtonBlock>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </StyledButtonBlock>

        </StyledTodolist>
    )
}

const StyledTodolist = styled.div`
    background-color: rgba(30, 186, 210, 0.7);
    box-shadow: 10px 10px 20px rgba(18, 107, 120, 0.9);
    border-radius: 5px;
    padding: 15px;
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
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin: 20px 0;

    & input {
        height: 30px;
    }

    & button {
        height: 30px;
        width: 30px;
    }
`

const StyledButtonBlock = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyleEmpty = styled.span`
    color: red;
    font-weight: 700;
    font-size: 24px;
    text-align: center;
`



