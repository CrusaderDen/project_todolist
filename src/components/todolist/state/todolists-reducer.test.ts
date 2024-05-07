import {v1} from "uuid";
import {AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer} from "./todolists-reducer";
import {FilterValuesType, TodolistType} from "../../../App";

let todolistId1: string
let todolistId2: string
let startState: TodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

})

//remove-------------------
test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
//add-------------------
test('correct todolist should be added', () => {
    const newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})
//change title-------------------
test('correct todolist should change its name', () => {
    const newTodolistTitle = 'New Todolist'
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTodolistTitle))
    expect(endState[1].title).toBe(newTodolistTitle)
    expect(endState[0].title).toBe('What to learn')
})
//change filter-------------------
test('correct filter of todolist should be mount', () => {
    const newFilterValue: FilterValuesType = 'active'
    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, newFilterValue))
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilterValue)
})

