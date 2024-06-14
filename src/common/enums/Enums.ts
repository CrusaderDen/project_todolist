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

export const enum ResultCode {
  success,
  error = 1,
  captcha = 10,
}
