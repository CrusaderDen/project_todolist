import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "0560c313-8e01-44e8-b3a8-970fcfb3c17e",
  },
};

export const api = {
  getTodolists() {
    return axios.get(
      "https://social-network.samuraijs.com/api/1.1/todo-lists",
      settings,
    );
  },
  deleteTodolist(todolistId: string) {
    return axios.delete(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
      settings,
    );
  },
  createTodolist(title: string) {
    return axios.post(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/`,
      { title },
      settings,
    );
  },
  updateTodolistTitle(todolistId: string, title: string) {
    return axios.put(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
      { title },
      settings,
    );
  },
  getTodolistTasks(todolistId: string) {
    return axios.get(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
      settings,
    );
  },
  createTodolistTask(todolistId: string, title: string) {
    return axios.post(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
      { title },
      settings,
    );
  },
  deleteTodolistTask(todolistId: string, taskId: string) {
    return axios.delete(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
      settings,
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
    return axios.put(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
      newTask,
      settings,
    );
  },
};
