import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "0560c313-8e01-44e8-b3a8-970fcfb3c17e",
  },
});

export const api = {
  getTodolists() {
    return instance.get<TodolistServerType[]>("/todo-lists");
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<TodolistResponseType>(`/todo-lists/${todolistId}`);
  },
  createTodolist(title: string) {
    return instance.post<TodolistResponseType>(`/todo-lists/`, { title });
  },
  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put<TodolistResponseType<{ item: TodolistServerType }>>(
      `/todo-lists/${todolistId}`,
      { title },
    );
  },
  getTodolistTasks(todolistId: string) {
    return instance.get<getTasksResponseType>(
      `/todo-lists/${todolistId}/tasks`,
    );
  },
  createTodolistTask(todolistId: string, title: string) {
    return instance.post<TaskResponseType<{ items: serverTaskType[] }>>(
      `/todo-lists/${todolistId}/tasks`,
      { title },
    );
  },
  deleteTodolistTask(todolistId: string, taskId: string) {
    return instance.delete<TaskResponseType>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
    );
  },
  updateTodolistTaskTitle(todolistId: string, taskId: string, title: string) {
    const newTask = {
      id: taskId,
      title,
      description: null,
      todoListId: todolistId,
      order: 0,
      status: 0,
      priority: 1,
      startDate: null,
      deadline: null,
      addedDate: new Date(),
    };
    return instance.put<TaskResponseType<{ items: serverTaskType[] }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      newTask,
    );
  },
};

//Types for Todos

type FieldErrorType = {
  error: string;
  field: string;
};

type TodolistServerType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

type TodolistResponseType<T = {}> = {
  data: T;
  messages: string[];
  fieldsErrors: FieldErrorType[];
  resultCode: number;
};

//Types for Tasks

type serverTaskType = {
  id: string;
  title: string;
  description: string | null;
  todoListId: string;
  order: number;
  status: number;
  priority: number;
  startDate: string | null;
  deadline: string | null;
  addedDate: string;
};

type getTasksResponseType = {
  items: serverTaskType[];
  totalCount: number;
  error: string | null;
};

type TaskResponseType<T = {}> = {
  data: T;
  messages: string[];
  fieldsErrors: FieldErrorType[];
  resultCode: number;
};
