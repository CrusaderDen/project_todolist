import { TodolistDomainType, todolistsThunks } from "./todolists-reducer"
import { TodoList } from "./Todolist/TodoList"
import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { AppRootStateType, useAppDispatch } from "app/store"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { RequestStatusType } from "app/appReducer"
import { Navigate } from "react-router-dom"
import { Button } from "@mui/material"
import { authThunks } from "features/auth/model/auth-reducer"

export const TodolistsList = () => {
  const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(todolistsThunks.createTodolist(title))
    },
    [dispatch],
  )

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(todolistsThunks.getTodolists())
  }, [dispatch])

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  const logOut = () => {
    dispatch(authThunks.logout())
  }

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
      <Button variant="contained" onClick={logOut}>
        Log Out
      </Button>
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
