import React, { ChangeEvent, memo, useCallback } from "react";
import { S } from "./_styles";
import { EditableField } from "./EditableField";
import { Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeTaskStatusTC,
  ChangeTaskTitleTC,
  deleteTaskTC,
} from "../state/tasks-reducer";
import { AppRootStateType } from "../state/store";
import { ServerTaskType, TaskStatuses } from "../../../api/api";

type TaskPropsType = {
  taskId: string;
  todolistId: string;
};

export const Task = memo(({ taskId, todolistId }: TaskPropsType) => {
  // function useTask() {
  //     let task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId].filter((t: { id: string }) => t.id === taskId)[0])
  //     const dispatch = useDispatch()
  //
  //     const onRemoveHandler = useCallback(() => dispatch(RemoveTaskAC(todolistId, taskId)), [dispatch])
  //     const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => dispatch(ChangeTaskStatusAC(todolistId, taskId, e.currentTarget.checked)), [dispatch])
  //     const onChangeTitleHandler = useCallback((title: string) => dispatch(ChangeTaskTitleAC(todolistId, taskId, title)), [dispatch])
  //     return [task, onRemoveHandler, onChangeStatusHandler, onChangeTitleHandler] as const
  // }
  //
  // [task, onRemoveHandler, onChangeStatusHandler, onChangeTitleHandler] = useTask()

  let task = useSelector<AppRootStateType, ServerTaskType>(
    (state) =>
      state.tasks[todolistId].filter((t: { id: string }) => t.id === taskId)[0],
  );
  const dispatch = useDispatch();

  const onRemoveHandler = useCallback(() => {
    // @ts-ignore
    dispatch(deleteTaskTC(todolistId, taskId));
  }, [dispatch]);
  const onChangeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const currentStatus = e.currentTarget.checked
        ? TaskStatuses.Completed
        : TaskStatuses.New;
      // @ts-ignore
      dispatch(ChangeTaskStatusTC(todolistId, taskId, currentStatus));
    },
    [dispatch],
  );
  const onChangeTitleHandler = useCallback(
    (title: string) => {
      // @ts-ignore
      dispatch(ChangeTaskTitleTC(todolistId, taskId, title));
    },
    [dispatch],
  );

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
  );
});
