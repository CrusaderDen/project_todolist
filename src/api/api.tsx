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
    return instance.get("/todo-lists");
  },
  deleteTodolist(todolistId: string) {
    return instance.delete(`/todo-lists/${todolistId}`);
  },
  createTodolist(title: string) {
    return instance.post(`/todo-lists/`, { title });
  },
  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put(`/todo-lists/${todolistId}`, { title });
  },
  getTodolistTasks(todolistId: string) {
    return instance.get(`/todo-lists/${todolistId}/tasks`);
  },
  createTodolistTask(todolistId: string, title: string) {
    return instance.post(`/todo-lists/${todolistId}/tasks`, { title });
  },
  deleteTodolistTask(todolistId: string, taskId: string) {
    return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`);
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
    return instance.put(`/${todolistId}/tasks/${taskId}`, newTask);
  },
};
