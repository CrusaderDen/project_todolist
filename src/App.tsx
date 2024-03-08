import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    //BLL

    const todoListTitle = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ])

    const [newTask, setNewTask] = useState<TaskType>({id: 0, title: '', isDone: false})
    const [filter, setFilter] = useState<FilterValuesType>('all')


    function getNewTask(event: ChangeEvent<HTMLInputElement>) {
        let currenTask: string = event.currentTarget.value
        setNewTask({id: tasks.length + 1, title: currenTask, isDone: false})
    }

    function addTask() {
        setTasks([...tasks, newTask])

    }

    function removeTask(taskId: number): void {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    function changeTodoListFilter(filter: FilterValuesType) {
        setFilter(filter)
    }

    //UI
    const getFilteredTasks = (allTasks: Array<TaskType>, currentFilter: FilterValuesType): Array<TaskType> => {
        switch (currentFilter) {
            case 'active' :
                return allTasks.filter(t => t.isDone === false)
            case 'completed':
                return allTasks.filter(t => t.isDone === true)
            default:
                return allTasks
        }
    }

    const filteredTasks = getFilteredTasks(tasks, filter)


    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                addTask={addTask}
                getNewTask={getNewTask}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
