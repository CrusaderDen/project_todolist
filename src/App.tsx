import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/todolist/TodoList";
import {v1} from "uuid";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    //BLL

    // const [tasks, setTasks] = useState<TaskType[]>([
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'React', isDone: false},
    //     {id: v1(), title: 'Redux', isDone: false},
    //     {id: v1(), title: 'Next JS', isDone: false},
    // ])

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [allTasks, setAllTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Next JS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Эклерчики', isDone: true},
            {id: v1(), title: 'Пивко', isDone: false},
            {id: v1(), title: 'Чипсы', isDone: true},
        ],

    })


    function addTask(taskTitle: string, todolistId: string) {
        const task: TaskType = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        const tasks = allTasks[todolistId]
        const newTasks = [task, ...tasks]
        allTasks[todolistId] = newTasks
        setAllTasks({...allTasks})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let task = allTasks[todolistId].find(t => id === t.id)
        if (task) {
            task.isDone = isDone
            setAllTasks({...allTasks})
        }
    }

    function removeTask(taskId: string, todolistId: string) {
        const tasks = allTasks[todolistId]
        const filteredTasks = tasks.filter(task => task.id !== taskId)
        allTasks[todolistId] = filteredTasks
        setAllTasks({...allTasks})
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(td => td.id !== todolistId))
    }


    function changeTodoListFilter(filter: FilterValuesType, todolistId: string) {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }


    /*
        const todolistAttributes = {
            title: todoListTitle,
            tasks: filteredTasks,
            filter,
            removeTask,
            addTask,
            changeTodoListFilter,
            changeStatus,
        }
     */


    return (
        <div className="App">

            {todolists.map(todoList => {
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

                const filteredTasks = getFilteredTasks(allTasks[todoList.id], todoList.filter)

                return <TodoList
                    key={todoList.id}
                    todoListId={todoList.id}
                    title={todoList.title}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    removeTodolist={removeTodolist}
                    addTask={addTask}
                    changeTodoListFilter={changeTodoListFilter}
                    changeStatus={changeStatus}
                    filter={todoList.filter}
                />
            })}


        </div>
    );
}

export default App;


/*
<TodoList
    title={todoListTitle}
    tasks={filteredTasks}
    removeTask={removeTask}
    addTask={addTask}
    changeTodoListFilter={changeTodoListFilter}
    changeStatus={changeStatus}
    filter={filter}
/>
*/