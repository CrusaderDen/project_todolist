import { createTodolistTC, getTodolistsTC, TodolistDomainType } from "./todolists-reducer"
import { TodoList } from "./Todolist/TodoList"
import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { AppRootStateType, useAppDispatch } from "app/store"
import { AddItemForm } from "components/AddItemForm/AddItemForm"
import { RequestStatusType } from "app/appReducer"

export const TodolistsList = () => {
  const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const dispatch = useAppDispatch()

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(createTodolistTC(title))
    },
    [dispatch],
  )

  useEffect(() => {
    dispatch(getTodolistsTC())
  }, [])

  const todolistsRender = todolists.map(todoList => (
    <TodoList
      key={todoList.id}
      todolistId={todoList.id}
      title={todoList.title}
      filter={todoList.filter}
      entityStatus={todoList.entityStatus}
    />
  ))

  return (
    <>
      <AddItemForm
        addItem={addTodolist}
        placeholder={"Create a new todolist"}
        variant={"standard"}
        disabled={status === "loading"}
      />
      {todolistsRender}
    </>
  )
}
