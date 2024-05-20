import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "750b834e-bc51-43bd-beec-013db0e3f0f0",
    },
});

//---------API
export const api = {

    //Todolists requests
    getTodolists() {
        return instance.get<ServerTodolistType[]>("/todo-lists")
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<TodolistResponseType>(`/todo-lists/${todolistId}`)
    },
    createTodolist(title: string) {
        return instance.post<TodolistResponseType<{ item: ServerTodolistType }>>(`/todo-lists/`, {title})
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<TodolistResponseType<{ item: ServerTodolistType }>>(`/todo-lists/${todolistId}`, {title})
    },

    //Tasks requests
    getTodolistTasks(todolistId: string) {
        return instance.get<getTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTodolistTask(todolistId: string, title: string) {
        return instance.post<TaskResponseType<{ item: ServerTaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTodolistTask(todolistId: string, taskId: string) {
        return instance.delete<TaskResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<TaskResponseType<{ items: ServerTaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}

//---------Types

//Types for Todos
type FieldErrorType = {
    error: string;
    field: string;
};
export type ServerTodolistType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};
export type TodolistResponseType<T = {}> = {
    data: T;
    messages: string[];
    fieldsErrors: FieldErrorType[];
    resultCode: number;
};

//Types for Tasks
export enum TaskStatuses {
    New,
    InProgress,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later,
}

export type ServerTaskType = {
    id: string;
    title: string;
    description: string | null;
    todoListId: string;
    order: number;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string | null;
    deadline: string | null;
    addedDate: string;
};
type getTasksResponseType = {
    items: ServerTaskType[];
    totalCount: number;
    error: string | null;
};
export type TaskResponseType<T = {}> = {
    data: T;
    messages: string[];
    fieldsErrors: FieldErrorType[];
    resultCode: number;
};
export type UpdateTaskModelType = {
    title: string;
    description: string | null;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string | null;
    deadline: string | null;
};
