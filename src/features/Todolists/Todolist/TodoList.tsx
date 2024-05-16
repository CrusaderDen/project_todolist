import React, { useCallback } from "react";
import { TodoListTitle } from "./TodoListTitle";
import { S } from "./TodolistStyles";
import { FilterButtons } from "./FilterButtons";
import { TasksList } from "./Task/TasksList";
import { AddItemForm } from "../../../components/AddItemForm/AddItemForm";
import { Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { createTaskTC } from "../tasks-reducer";
import {
  changeTodolistTitleTC,
  deleteTodolistTC,
  FilterValuesType,
} from "../todolists-reducer";

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
  const changeTodolistTitle = (title: string) => {
    // @ts-ignore
    dispatch(changeTodolistTitleTC(todolistId, title));
  };
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
      <AddItemForm
        addItem={addTask}
        placeholder={"New task"}
        variant={"outlined"}
      />
      <S.StyledTasksTitle>Task list</S.StyledTasksTitle>
      <TasksList todolistId={todolistId} filter={filter} />
    </S.StyledTodolist>
  );
};
