import React, { useCallback } from "react"
import { TodoListTitle } from "./TodoListTitle"
import { S } from "./TodolistStyles"
import { FilterButtons } from "./FilterButtons"
import { TasksList } from "./Task/TasksList"
import { Button, Stack } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { tasksThunks } from "../tasks-reducer"
import { FilterValuesType, todolistsThunks } from "../todolists-reducer"
import { RequestStatusType } from "app/appReducer"
import { useAppDispatch } from "app/store"
import { AddItemForm } from "common/components"

type TodoListPropsType = {
  todolistId: string
  title: string
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const TodoList = ({ todolistId, title, filter, entityStatus }: TodoListPropsType) => {
  const dispatch = useAppDispatch()

  const removeTodolist = () => {
    dispatch(todolistsThunks.deleteTodolist(todolistId))
  }
  const changeTodolistTitle = (title: string) => {
    dispatch(todolistsThunks.changeTodolistTitle({ todolistId, title }))
  }
  const addTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.createTask({ todolistId, title }))
    },
    [todolistId, dispatch],
  )

  return (
    <S.StyledTodolist>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Button
          color={"secondary"}
          variant="text"
          startIcon={<DeleteIcon />}
          onClick={() => removeTodolist()}
          disabled={entityStatus === "loading"}
        >
          Delete
        </Button>
      </Stack>
      <FilterButtons filter={filter} todolistId={todolistId} />
      <TodoListTitle title={title} todolistId={todolistId} changeTodolistTitle={changeTodolistTitle} />
      <AddItemForm
        addItem={addTask}
        placeholder={"New task"}
        variant={"outlined"}
        disabled={entityStatus === "loading"}
      />
      <S.StyledTasksTitle>Task list</S.StyledTasksTitle>
      <TasksList todolistId={todolistId} filter={filter} />
    </S.StyledTodolist>
  )
}
