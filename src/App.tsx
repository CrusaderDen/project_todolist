import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    //BLL

    const todoListTitle = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])


    const [filter, setFilter] = useState<FilterValuesType>('all')

    function addTask(taskTitle: string) {
        const newTask: TaskType = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        const nextState = [newTask, ...tasks]
        if (newTask.title !== '') {
            setTasks(nextState)
        }
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => id === t.id)
        if (task) task.isDone = isDone
        setTasks([...tasks])
    }

    function removeTask(taskId: string): void {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    function changeTodoListFilter(filter: FilterValuesType) {
        setFilter(filter)
    }

    //UI
    const getFilteredTasks = (allTasks: Array<TaskType>, currentFilter: FilterValuesType): Array<TaskType> => {
        switch (currentFilter) {
            case 'active' :
                return allTasks.filter(t => !t.isDone)
            case 'completed':
                return allTasks.filter(t => t.isDone)
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
                changeTodoListFilter={changeTodoListFilter}
                changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
