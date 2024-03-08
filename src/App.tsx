import React, {useEffect, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    //BLL

    const todoListTitle = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ])


    function removeTask(taskId: number): void {
        let filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
    }

    //UI
    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}

export default App;
