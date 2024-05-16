import React from "react";
import { S } from "../../features/Todolists/Todolist/TodolistStyles";
import { FilterValuesType } from "../../features/Todolists/todolists-reducer";

type ButtonPropsType = {
  title: string;
  taskId?: string;
  onClickHandler?: () => void;
  currentFilter?: FilterValuesType;
  expectedFilter?: string;
};

export const UniversalButton = (props: ButtonPropsType) => {
  return (
    <S.StyledButton
      onClick={props.onClickHandler}
      filter={props.currentFilter}
      $expectedFilter={props.expectedFilter}
      title={props.title}
    >
      <span>{props.title}</span>
    </S.StyledButton>
  );
};
