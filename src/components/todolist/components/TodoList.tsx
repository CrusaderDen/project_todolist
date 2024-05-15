import React, { useCallback } from "react";
import { TodoListTitle } from "./TodoListTitle";
import { S } from "./_styles";
import { FilterButtons } from "./FilterButtons";
import { TasksList } from "./TasksList";
import { AddTodolistForm } from "../../../AddTodolistForm";
import { Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { AddTaskAC, createTaskTC } from "../state/tasks-reducer";
import {
  ChangeTodolistTitleAC,
  deleteTodolistTC,
  FilterValuesType,
  RemoveTodolistAC,
} from "../state/todolists-reducer";
import { api } from "../../../api/api";

type TodoListPropsType = {
  todolistId: string;
  title: string;
  filter: FilterValuesType;
};

export const TodoList = ({ todolistId, title, filter }: TodoListPropsType) => {
  const dispatch = useDispatch();

  const removeTodolist = () => {
    // @ts-ignore
    dispatch(deleteTodolistTC(todolistId));
  };
  const changeTodolistTitle = (title: string) =>
    dispatch(ChangeTodolistTitleAC(todolistId, title));
  const addTask = useCallback(
    (title: string) => {
      // @ts-ignore
      dispatch(createTaskTC(todolistId, title));
    },
    [todolistId, dispatch],
  );

  return (
    <S.StyledTodolist>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Button
          color={"secondary"}
          variant="text"
          startIcon={<DeleteIcon />}
          onClick={() => removeTodolist()}
        >
          Delete
        </Button>
      </Stack>
      <FilterButtons filter={filter} todolistId={todolistId} />
      <TodoListTitle
        title={title}
        todolistId={todolistId}
        changeTodolistTitle={changeTodolistTitle}
      />
      <AddTodolistForm
        addItem={addTask}
        placeholder={"New task"}
        variant={"outlined"}
      />
      <S.StyledTasksTitle>Task list</S.StyledTasksTitle>
      <TasksList todolistId={todolistId} filter={filter} />
    </S.StyledTodolist>
  );
};
