import {v1} from "uuid"
import {ChangeTodolistEntityStatusAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, FilterValuesType, RemoveTodolistAC, SetTodolistsAC, TodolistDomainType, todolistsReducer,} from "./todolists-reducer"
import {RequestStatusType} from "../../app/appReducer";

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      entityStatus: "idle",
      addedDate: "",
      order: 0,
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      entityStatus: "idle",
      addedDate: "",
      order: 0,
    },
  ]
})

//remove-------------------
test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})
//add-------------------
// test("correct todolist should be added", () => {
//   const newTodolistTitle = "New Todolist"
//   const endState = todolistsReducer(
//     startState,
//     AddTodolistAC(newTodolistTitle),
//   )
//   expect(endState.length).toBe(3)
//   expect(endState[0].title).toBe(newTodolistTitle)
// })
//change title-------------------
test("correct todolist should change its name", () => {
  const newTodolistTitle = "New Todolist"
  const endState = todolistsReducer(
    startState,
    ChangeTodolistTitleAC(todolistId2, newTodolistTitle),
  )
  expect(endState[1].title).toBe(newTodolistTitle)
  expect(endState[0].title).toBe("What to learn")
})
//change filter-------------------
test("correct filter of todolist should be mount", () => {
  const newFilterValue: FilterValuesType = "active"
  const endState = todolistsReducer(
    startState,
    ChangeTodolistFilterAC(todolistId2, newFilterValue),
  )
  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilterValue)
})
//set todolists
test("todolists should be set to the state", () => {
  const action = SetTodolistsAC(startState)
  const endState = todolistsReducer([], action)
  expect(endState.length).toBe(2)
})

test("correct status of todolist should be mount", () => {
  const newStatus: RequestStatusType = "loading"
  const endState = todolistsReducer(
      startState,
      ChangeTodolistEntityStatusAC(todolistId2, newStatus),
  )
  expect(endState[0].entityStatus).toBe("idle")
  expect(endState[1].entityStatus).toBe('loading')
})
