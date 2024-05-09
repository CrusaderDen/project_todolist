import React, { useMemo } from "react";
import { S } from "./_styles";
import { Task } from "./Task";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../state/store";
import { FilterValuesType } from "../state/todolists-reducer";
import { ServerTaskType, TaskStatuses } from "../../../api/api";

type TasksListPropsType = {
  todolistId: string;
  filter: FilterValuesType;
};

export const TasksList = (props: TasksListPropsType) => {
  let tasks = useSelector<AppRootStateType, ServerTaskType[]>(
    (state) => state.tasks[props.todolistId],
  );

  tasks = useMemo(() => {
    if (props.filter === "active") {
      tasks = tasks.filter((t) => t.status === TaskStatuses.New);
    } else if (props.filter === "completed") {
      tasks = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }
    return tasks;
  }, [props.filter, tasks]);

  const tasksList =
    tasks.length === 0 ? (
      <S.StyleEmpty>No any tasks yet</S.StyleEmpty>
    ) : (
      tasks.map((task: ServerTaskType) => (
        <li key={task.id}>
          <Task todolistId={props.todolistId} taskId={task.id} />
        </li>
      ))
    );

  return <S.StyledTaskList> {tasksList} </S.StyledTaskList>;
};
