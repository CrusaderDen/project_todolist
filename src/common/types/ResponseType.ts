export type ResponseType<T = {}> = {
  data: T
  messages: string[]
  fieldsErrors: FieldErrorType[]
  resultCode: number
}

type FieldErrorType = {
  error: string
  field: string
}
