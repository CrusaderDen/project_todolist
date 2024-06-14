import React, { useEffect, useMemo } from "react"
import { S } from "../TodolistStyles"
import { Task } from "./Task"
import { useSelector } from "react-redux"
import { AppRootStateType, useAppDispatch } from "app/store"
import { FilterValuesType } from "../../todolists-reducer"
import { ServerTaskType } from "api/api"
import { tasksThunks } from "../../tasks-reducer"
import { TaskStatuses } from "common/enums/Enums"

type TasksListPropsType = {
  todolistId: string
  filter: FilterValuesType
}

export const TasksList = (props: TasksListPropsType) => {
  let tasks = useSelector<AppRootStateType, ServerTaskType[]>(state => state.tasks[props.todolistId])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tasksThunks.getTasks(props.todolistId))
  }, [])

  tasks = useMemo(() => {
    if (props.filter === "active") {
      tasks = tasks.filter(t => t.status === TaskStatuses.New)
    } else if (props.filter === "completed") {
      tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return tasks
  }, [props.filter, tasks])

  const tasksList =
    tasks.length === 0 ? (
      <S.StyleEmpty>No any tasks yet</S.StyleEmpty>
    ) : (
      tasks.map((task: ServerTaskType) => (
        <li key={task.id}>
          <Task todolistId={props.todolistId} taskId={task.id} />
        </li>
      ))
    )

  return <S.StyledTaskList> {tasksList} </S.StyledTaskList>
}
