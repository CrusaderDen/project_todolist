import React, { useCallback, useEffect } from "react";
import "./App.css";
import { AddTodolistForm } from "./AddTodolistForm";
import {
  AddTodolistAC,
  fetchTodolistsTC,
  TodolistDomainType,
} from "./components/todolist/state/todolists-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./components/todolist/state/store";
import { TodoList } from "./components/todolist/components/TodoList";
import { Clock } from "./components/clock/Clock";
import { ServerTaskType } from "./api/api";

export type TasksStateType = {
  [key: string]: ServerTaskType[];
};

function App() {
  const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(
    (state) => state.todolists,
  );
  const dispatch = useDispatch();

  const addTodolist = useCallback(
    (title: string) => dispatch(AddTodolistAC(title)),
    [dispatch],
  );

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchTodolistsTC());
  }, []);

  return (
    <div className="App">
      <Clock />
      <AddTodolistForm
        addItem={addTodolist}
        placeholder={"Create a new todolist"}
        variant={"standard"}
      />
      {todolists.map((todoList) => {
        return (
          <TodoList
            key={todoList.id}
            todolistId={todoList.id}
            title={todoList.title}
            filter={todoList.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
