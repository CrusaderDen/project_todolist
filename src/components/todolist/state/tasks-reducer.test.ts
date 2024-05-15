import {AddTaskAC, RemoveTaskAC, SetTasksAC, tasksReducer, updateTaskAC,} from "./tasks-reducer"
import {RemoveTodolistAC, SetTodolistsAC} from "./todolists-reducer"
import {TasksStateType} from "../../../App"
import {TaskPriorities, TaskStatuses} from "../../../api/api"
import {v1} from "uuid"

export const todolistId1 = v1()
export const todolistId2 = v1()

let startState: TasksStateType

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "4",
        title: "Redux",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "5",
        title: "Next JS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "Эклерчики",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "Пивко",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "Чипсы",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const action = RemoveTaskAC("todolistId2", "2")
  const endState = tasksReducer(startState, action)
  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "4",
        title: "Redux",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "5",
        title: "Next JS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "Эклерчики",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
      {
        id: "3",
        title: "Чипсы",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
    ],
  })
})

test("correct task should be added to correct array", () => {
  const action = AddTaskAC({
    id: "2",
    title: "Сок",
    status: TaskStatuses.New,
    todoListId: "todolistId2",
    startDate: "",
    deadline: "",
    addedDate: "",
    order: 0,
    description: "",
    priority: TaskPriorities.Low,
  })
  const endState = tasksReducer(startState, action)
  expect(endState["todolistId1"].length).toBe(5)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("Сок")
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)
})

test("status of specified task should be changed", () => {
  const action = updateTaskAC("todolistId2", "2", {
    status: TaskStatuses.Completed,
  })
  const endState = tasksReducer(startState, action)
  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.Completed)
})

test("title of specified task should be changed", () => {
  const action = updateTaskAC("todolistId2", "2", { title: "Сок" })
  const endState = tasksReducer(startState, action)
  expect(endState["todolistId1"][1].title).toBe("JS")
  expect(endState["todolistId2"][1].title).toBe("Сок")
})

// test("new array should be added when new todolist is added", () => {
//   const action = AddTodolistAC("new todolist")
//   const endState = tasksReducer(startState, action)
//   const keys = Object.keys(endState)
//   const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
//   if (!newKey) throw Error("new key should be added")
//   expect(keys.length).toBe(3)
//   expect(endState[newKey]).toEqual([])
// })

test("property with todolistID should be deleted", () => {
  const action = RemoveTodolistAC("todolistId2")
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)
  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})

test("empty arrays should be added when we set todolists", () => {
  const action = SetTodolistsAC([
    {
      id: todolistId1,
      title: "What to learn",
      addedDate: "",
      order: 0,
    },
    {
      id: todolistId2,
      title: "What to buy",
      addedDate: "",
      order: 0,
    },
  ])
  const endState = tasksReducer({}, action)
  expect(Object.keys(endState).length).toBe(2)
  expect(endState[todolistId1]).toEqual([])
  expect(endState[todolistId2]).toEqual([])
})

test("tasks should be added for todolist", () => {
  const action = SetTasksAC(
    [
      {
        id: "1",
        title: "Эклерчики",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        description: "",
        priority: TaskPriorities.Low,
      },
    ],
    "todolistId1",
  )
  const endState = tasksReducer({ todolistId1: [], todolistId2: [] }, action)
  expect(endState["todolistId1"].length).toBe(1)
  expect(endState["todolistId2"].length).toBe(0)
})
