import { tasksActions, tasksReducer, TasksStateType, tasksThunks } from "./tasks-reducer"
import { ServerTaskType, TaskPriorities, TaskStatuses } from "api/api"
import { v1 } from "uuid"
import { AddTodolistAC, RemoveTodolistAC, SetTodolistsAC } from "features/Todolists/todolists-reducer"

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
  const action = tasksActions.removeTask({ todolistId: "todolistId2", taskId: "2" })
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
  const action = tasksThunks.getTasks.fulfilled(
    {
      tasks: startState["todolistId1"],
      todolistId: "todolistId1",
    },
    "requestId",
    "todolistId1",
  )
  const endState = tasksReducer(startState, action)
  expect(endState["todolistId1"].length).toBe(5)
  expect(endState["todolistId2"].length).toBe(3)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("Эклерчики")
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.Completed)
})

test("status of specified task should be changed", () => {
  const action = tasksActions.updateTask({
    todolistId: "todolistId2",
    taskId: "2",
    model: { status: TaskStatuses.Completed },
  })
  const endState = tasksReducer(startState, action)
  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.Completed)
})

test("title of specified task should be changed", () => {
  const action = tasksActions.updateTask({ todolistId: "todolistId2", taskId: "2", model: { title: "Сок" } })
  const endState = tasksReducer(startState, action)
  expect(endState["todolistId1"][1].title).toBe("JS")
  expect(endState["todolistId2"][1].title).toBe("Сок")
})

test("new array should be added when new todolist is added", () => {
  const action = AddTodolistAC({
    todolist: {
      id: "kek",
      title: "wait",
      order: 0,
      addedDate: "",
    },
  })
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) throw Error("new key should be added")
  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistID should be deleted", () => {
  const action = RemoveTodolistAC({ id: "todolistId2" })
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)
  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})

test("empty arrays should be added when we set todolists", () => {
  const action = SetTodolistsAC({
    todolists: [
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
    ],
  })
  const endState = tasksReducer({}, action)
  expect(Object.keys(endState).length).toBe(2)
  expect(endState[todolistId1]).toEqual([])
  expect(endState[todolistId2]).toEqual([])
})

test("tasks should be added for todolist", () => {
  type FetchTaskAction = Omit<ReturnType<typeof tasksThunks.getTasks.fulfilled>, "meta">

  const action: FetchTaskAction = {
    type: tasksThunks.getTasks.fulfilled.type,
    payload: { tasks: startState["todolistId1"], todolistId: "todolistId1" },
  }
  const endState = tasksReducer({ todolistId1: [], todolistId2: [] }, action)
  expect(endState["todolistId1"].length).toBe(5)
  expect(endState["todolistId2"].length).toBe(0)
})
