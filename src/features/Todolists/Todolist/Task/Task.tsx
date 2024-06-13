import React, { ChangeEvent, memo, useCallback } from "react"
import { S } from "../TodolistStyles"
import { EditableField } from "components/EditableField/EditableField"
import { Checkbox, IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useDispatch, useSelector } from "react-redux"
import { tasksThunks, updateTaskTC } from "../../tasks-reducer"
import {AppRootStateType, useAppDispatch} from "app/store"
import { ServerTaskType, TaskStatuses } from "api/api"

type TaskPropsType = {
  taskId: string
  todolistId: string
}

export const Task = memo(({ taskId, todolistId }: TaskPropsType) => {
  let task = useSelector<AppRootStateType, ServerTaskType>(
    state => state.tasks[todolistId].filter((t: { id: string }) => t.id === taskId)[0],
  )
  const dispatch = useAppDispatch()

  const onRemoveHandler = useCallback(() => {
    dispatch(tasksThunks.deleteTask({todolistId, taskId}))
  }, [dispatch])
  const onChangeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const currentStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
      dispatch(
        updateTaskTC(todolistId, taskId, { status: currentStatus }),
      )
    },
    [dispatch],
  )
  const onChangeTitleHandler = useCallback(
    (newTitle: string) => {
      dispatch(updateTaskTC(todolistId, taskId, { title: newTitle }))
    },
    [dispatch],
  )

  return (
    <S.StyledTask>
      <span>
        <Checkbox
          checked={task.status === TaskStatuses.Completed}
          onChange={onChangeStatusHandler}
          color="secondary"
          size={"medium"}
        />
        <EditableField
          title={task.title}
          isDone={task.status === TaskStatuses.Completed}
          onChange={onChangeTitleHandler}
        />
      </span>
      <IconButton aria-label="delete" onClick={onRemoveHandler}>
        <DeleteIcon />
      </IconButton>
    </S.StyledTask>
  )
})
