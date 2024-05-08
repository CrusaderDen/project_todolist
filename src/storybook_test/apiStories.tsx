import React, { useState } from "react";
import { api } from "../api/api";

type apiStoriesPT = {
  btnName: string;
};

export const ApiStories = ({ btnName }: apiStoriesPT) => {
  const [state, setState] = useState("");
  const [todoId, setTodoId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [title, setTitle] = useState("");

  let labelForFirstField: string = "";
  let labelForSecondField: string = "";
  let labelForThirdField: string = "";
  switch (btnName) {
    case "Удалить тудулист":
      labelForFirstField = "id";
      break;
    case "Создать тудулист":
      labelForFirstField = "title";
      break;
    case "Обновить тайтл тудулиста":
      labelForFirstField = "id";
      labelForSecondField = "title";
      break;
    case "Получить таски тудулиста":
      labelForFirstField = "id";
      break;
    case "Создать таску тудулиста":
      labelForFirstField = "id";
      labelForSecondField = "title";
      break;
    case "Удалить таску тудулиста":
      labelForFirstField = "Todo id";
      labelForSecondField = "Task id";
      break;
    case "Обновить таску тудулиста":
      labelForFirstField = "Todo id";
      labelForSecondField = "Task id";
      labelForThirdField = "Title";
      break;
  }

  const onChangeTitleHandler = (e: any) => setTitle(e.currentTarget.value);
  const onChangeTaskIdHandler = (e: any) => setTaskId(e.currentTarget.value);
  const onChangeTodoIdHandler = (e: any) => setTodoId(e.currentTarget.value);

  const onClickHandler = () => {
    switch (btnName) {
      case "Получить тудулисты":
        api.getTodolists().then((res) => setState(res.data));
        break;
      case "Удалить тудулист":
        api.deleteTodolist(todoId).then((res) => setState(res.data));
        break;
      case "Создать тудулист":
        api.createTodolist(title).then((res) => setState(res.data));
        break;
      case "Обновить тайтл тудулиста":
        api
          .updateTodolistTitle(todoId, title)
          .then((res) => setState(res.data));
        break;
      case "Получить таски тудулиста":
        api.getTodolistTasks(todoId).then((res) => setState(res.data.items));
        break;
      case "Создать таску тудулиста":
        api.createTodolistTask(todoId, title).then((res) => setState(res.data));
        break;
      case "Удалить таску тудулиста":
        api
          .deleteTodolistTask(todoId, taskId)
          .then((res) => setState(res.data));
        break;
      case "Обновить таску тудулиста":
        api
          .updateTodolistTaskTitle(todoId, taskId, title)
          .then((res) => setState(res.data));
        break;
    }
  };

  let input = <></>;

  if (
    btnName === "Удалить тудулист" ||
    btnName === "Получить таски тудулиста"
  ) {
    input = (
      <>
        <input onChange={(e) => onChangeTodoIdHandler(e)} />
        <span>{labelForFirstField}</span>
      </>
    );
  }

  if (btnName === "Создать тудулист") {
    input = (
      <>
        <input onChange={(e) => onChangeTitleHandler(e)} />
        <span>{labelForFirstField}</span>
      </>
    );
  }

  if (
    btnName === "Обновить тайтл тудулиста" ||
    btnName === "Создать таску тудулиста"
  ) {
    input = (
      <>
        <div>
          <input onChange={(e) => onChangeTodoIdHandler(e)} />
          <span>{labelForFirstField}</span>
        </div>
        <input onChange={(e) => onChangeTitleHandler(e)} />
        <span>{labelForSecondField}</span>
      </>
    );
  }

  if (btnName === "Удалить таску тудулиста") {
    input = (
      <>
        <div>
          <input onChange={(e) => onChangeTodoIdHandler(e)} />
          <span>{labelForFirstField}</span>
        </div>
        <input onChange={(e) => onChangeTaskIdHandler(e)} />
        <span>{labelForSecondField}</span>
      </>
    );
  }

  if (btnName === "Обновить таску тудулиста") {
    input = (
      <>
        <div>
          <input onChange={(e) => onChangeTodoIdHandler(e)} />
          <span>{labelForFirstField}</span>
        </div>
        <div>
          <input onChange={(e) => onChangeTaskIdHandler(e)} />
          <span>{labelForSecondField}</span>
        </div>
        <div>
          <input onChange={(e) => onChangeTitleHandler(e)} />
          <span>{labelForThirdField}</span>
        </div>
      </>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          onClickHandler();
        }}
      >
        {btnName}
      </button>
      {input}
      <div>{state && JSON.stringify(state)}</div>
    </div>
  );
};
