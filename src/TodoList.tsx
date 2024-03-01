import React from "react";
import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader";


type TodoListPropsType = {
    title: string
    tasks: TaskType[]
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


export const TodoList = ({title,tasks}: TodoListPropsType) => {

    const tasksList = tasks.length === 0
    ? <span className={'emptyList'}>Список пуст</span>
        :   tasks.map((task: TaskType)=>{
            return (
                <li key={task.id}><input type="checkbox" defaultChecked={task.isDone}/> <span>{task.title}</span></li>
            )
        })



    return (
        <div className={'todolist'}>
            <TodoListHeader title={title}/>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            <ul>
                {tasksList}
                {/*<li><input type="checkbox" checked={tasks[0].isDone}/> <span>{tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={tasks[1].isDone}/> <span>{tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={tasks[2].isDone}/> <span>{tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    )
}