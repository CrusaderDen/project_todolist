import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./components/todolist/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/todolist/todolist_Components/AddItemForm";
import {AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer} from "./components/todolist/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./components/todolist/tasks-reducer";

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

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Next JS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Эклерчики', isDone: true},
            {id: v1(), title: 'Пивко', isDone: false},
            {id: v1(), title: 'Чипсы', isDone: true},
        ],
    })

    function removeTodolist(todolistId: string) {
        const action = RemoveTodolistAC(todolistId)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    function changeTodolistTitle(newValue: string, todolistId: string) {
        dispatchTodolists(ChangeTodolistTitleAC(todolistId, newValue))
    }

    function changeTodoListFilter(filter: FilterValuesType, todolistId: string) {
        dispatchTodolists(ChangeTodolistFilterAC(todolistId, filter))
    }

    function removeTask(taskId: string, todolistId: string) {
        dispatchTasks(RemoveTaskAC(todolistId, taskId))
    }

    function addTask(taskTitle: string, todolistId: string) {
        dispatchTasks(AddTaskAC(todolistId, taskTitle))
    }

    function changeTaskTitle(id: string, newValue: string, todolistId: string) {
        dispatchTasks(ChangeTaskTitleAC(todolistId, id, newValue))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchTasks(ChangeTaskStatusAC(todolistId, id, isDone))
    }

//--------------

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} placeholder={'Create a new todolist'} variant={"standard"}/>
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

                const filteredTasks = getFilteredTasks(tasks[todoList.id], todoList.filter)

                return <TodoList
                    key={todoList.id}
                    todolistId={todoList.id}
                    title={todoList.title}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    removeTodolist={removeTodolist}
                    addTask={addTask}
                    changeTodoListFilter={changeTodoListFilter}
                    changeStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                    filter={todoList.filter}
                />
            })}
        </div>
    );
}

export default App;


/*
       const [allTasks, setAllTasks] = useState<TasksStateType>({
           [todolistId1]: [
               {id: v1(), title: 'HTML&CSS', isDone: true},
               {id: v1(), title: 'JS', isDone: true},
               {id: v1(), title: 'React', isDone: true},
               {id: v1(), title: 'Redux', isDone: false},
               {id: v1(), title: 'Next JS', isDone: false},
           ],
           [todolistId2]: [
               {id: v1(), title: 'Эклерчики', isDone: true},
               {id: v1(), title: 'Пивко', isDone: false},
               {id: v1(), title: 'Чипсы', isDone: true},
           ],

       })
   */
// const [todolists, setTodolists] = useState<TodolistType[]>([
//     {id: todolistId1, title: 'What to learn', filter: 'all'},
//     {id: todolistId2, title: 'What to buy', filter: 'all'},
// ])
/*
    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(td => td.id !== todolistId))
        delete allTasks[todolistId]
        setAllTasks({...allTasks})
    }

function addTodolist(title: string) {
    let newTodolist: TodolistType = {id: v1(), title: title, filter: 'all'}
    setTodolists([newTodolist, ...todolists])
    setAllTasks({...allTasks, [newTodolist.id]: []})
}

function changeTodolistTitle(newValue: string, todolistId: string) {
    const currentTodolist = todolists.find(tl => tl.id === todolistId)
    if (currentTodolist) {
        currentTodolist.title = newValue
        setTodolists([...todolists])
    }
}

function changeTodoListFilter(filter: FilterValuesType, todolistId: string) {
    const todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
        todolist.filter = filter
        setTodolists([...todolists])
    }
}
*/
/*


        //-----Task's functions

        function removeTask(taskId: string, todolistId: string) {
            const tasks = allTasks[todolistId]
            const filteredTasks = tasks.filter(task => task.id !== taskId)
            allTasks[todolistId] = filteredTasks
            setAllTasks({...allTasks})
        }

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

        function changeTaskTitle(id: string, newValue: string, todolistId: string) {
            let task = allTasks[todolistId].find(t => id === t.id)
            if (task) {
                task.title = newValue
                setAllTasks({...allTasks})
            }
        }

    */