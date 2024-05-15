import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";
import { TasksStateType } from "../../../App";
import { api, ServerTaskType, TaskStatuses } from "../../../api/api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";

//---------Initial state
const initialState: TasksStateType = {
  // [todolistId1]: [
  //   {
  //     id: v1(),
  //     title: "HTML&CSS",
  //     status: TaskStatuses.Completed,
  //     todoListId: todolistId1,
  //     startDate: "",
  //     deadline: "",
  //     addedDate: "",
  //     order: 0,
  //     description: "",
  //     priority: TaskPriorities.Low,
  //   },
  //   {
  //     id: v1(),
  //     title: "JS",
  //     status: TaskStatuses.Completed,
  //     todoListId: todolistId1,
  //     startDate: "",
  //     deadline: "",
  //     addedDate: "",
  //     order: 0,
  //     description: "",
  //     priority: TaskPriorities.Low,
  //   },
  //   {
  //     id: v1(),
  //     title: "React",
  //     status: TaskStatuses.Completed,
  //     todoListId: todolistId1,
  //     startDate: "",
  //     deadline: "",
  //     addedDate: "",
  //     order: 0,
  //     description: "",
  //     priority: TaskPriorities.Low,
  //   },
  //   {
  //     id: v1(),
  //     title: "Redux",
  //     status: TaskStatuses.New,
  //     todoListId: todolistId1,
  //     startDate: "",
  //     deadline: "",
  //     addedDate: "",
  //     order: 0,
  //     description: "",
  //     priority: TaskPriorities.Low,
  //   },
  //   {
  //     id: v1(),
  //     title: "Next JS",
  //     status: TaskStatuses.New,
  //     todoListId: todolistId1,
  //     startDate: "",
  //     deadline: "",
  //     addedDate: "",
  //     order: 0,
  //     description: "",
  //     priority: TaskPriorities.Low,
  //   },
  // ],
  // [todolistId2]: [
  //   {
  //     id: v1(),
  //     title: "Эклерчики",
  //     status: TaskStatuses.Completed,
  //     todoListId: todolistId2,
  //     startDate: "",
  //     deadline: "",
  //     addedDate: "",
  //     order: 0,
  //     description: "",
  //     priority: TaskPriorities.Low,
  //   },
  //   {
  //     id: v1(),
  //     title: "Пивко",
  //     status: TaskStatuses.New,
  //     todoListId: todolistId2,
  //     startDate: "",
  //     deadline: "",
  //     addedDate: "",
  //     order: 0,
  //     description: "",
  //     priority: TaskPriorities.Low,
  //   },
  //   {
  //     id: v1(),
  //     title: "Чипсы",
  //     status: TaskStatuses.Completed,
  //     todoListId: todolistId2,
  //     startDate: "",
  //     deadline: "",
  //     addedDate: "",
  //     order: 0,
  //     description: "",
  //     priority: TaskPriorities.Low,
  //   },
  // ],
};
//---------Reducer
export const tasksReducer = (
  state = initialState,
  action: TaskActionsType,
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (t) => t.id !== action.taskId,
        ),
      };
    case "ADD-TASK":
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, title: action.title } : t,
        ),
      };
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, status: action.status } : t,
        ),
      };
    case "ADD-TODOLIST":
      return { ...state, [action.todolist.id]: [] };
    case "REMOVE-TODOLIST":
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    case "SET-TODOLISTS":
      const result: TasksStateType = {};
      for (let i = 0; i < action.todolists.length; i++) {
        result[action.todolists[i].id] = [];
      }
      return result;
    case "SET-TASKS":
      const copyState = { ...state };
      copyState[action.todolistId] = action.tasks;
      return copyState;
    default:
      return state;
  }
};
//---------Action creators
export const RemoveTaskAC = (todolistId: string, taskId: string) =>
  ({ type: "REMOVE-TASK", todolistId, taskId }) as const;
export const AddTaskAC = (task: any) => ({ type: "ADD-TASK", task }) as const;
export const ChangeTaskTitleAC = (
  todolistId: string,
  taskId: string,
  title: string,
) => ({ type: "CHANGE-TASK-TITLE", todolistId, taskId, title }) as const;
export const ChangeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  status: TaskStatuses,
) => ({ type: "CHANGE-TASK-STATUS", todolistId, taskId, status }) as const;
export const SetTasksAC = (tasks: ServerTaskType[], todolistId: string) =>
  ({
    type: "SET-TASKS",
    tasks,
    todolistId,
  }) as const;
//---------AC Types
export type TaskActionsType =
  | ReturnType<typeof RemoveTaskAC>
  | ReturnType<typeof AddTaskAC>
  | ReturnType<typeof ChangeTaskTitleAC>
  | ReturnType<typeof ChangeTaskStatusAC>
  | ReturnType<typeof SetTasksAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType;
//---------Thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  api.getTodolistTasks(todolistId).then((res) => {
    dispatch(SetTasksAC(res.data.items, todolistId));
  });
};
export const deleteTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    api.deleteTodolistTask(todolistId, taskId).then((res) => {
      dispatch(RemoveTaskAC(todolistId, taskId));
    });
  };
export const createTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    api.createTodolistTask(todolistId, title).then((res) => {
      dispatch(AddTaskAC(res.data.data.item));
    });
  };
export const ChangeTaskStatusTC =
  (todolistId: string, taskId: string, newStatus: TaskStatuses) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    const task = state.tasks[todolistId].find((t) => t.id === taskId);
    if (!task) {
      console.warn("Task not found in the state");
      return;
    }
    const updatedTask = { ...task, status: newStatus };
    api
      .updateTodolistTaskStatus(todolistId, taskId, updatedTask)
      .then((res) => {
        dispatch(ChangeTaskStatusAC(todolistId, taskId, newStatus));
      });
  };
export const ChangeTaskTitleTC =
  (todolistId: string, taskId: string, title: string) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    api.updateTodolistTaskTitle(todolistId, taskId, title).then((res) => {
      dispatch(ChangeTaskTitleAC(todolistId, taskId, title));
    });
  };
