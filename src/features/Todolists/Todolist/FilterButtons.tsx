import React from "react"
import { S } from "./TodolistStyles"
import { UniversalButton } from "components/UniversalButton/UniversalButton"
import { ChangeTodolistFilterAC, FilterValuesType } from "../todolists-reducer"
import { useDispatch } from "react-redux"

type FilterButtonsPropsType = {
  todolistId: string
  filter: FilterValuesType
}

export const FilterButtons = (props: FilterButtonsPropsType) => {
  const dispatch = useDispatch()

  function onAllClickHandler() {
    dispatch(ChangeTodolistFilterAC({ id: props.todolistId, filter: "all" }))
  }

  function onActiveClickHandler() {
    dispatch(ChangeTodolistFilterAC({ id: props.todolistId, filter: "active" }))
  }

  function onCompletedClickHandler() {
    dispatch(ChangeTodolistFilterAC({ id: props.todolistId, filter: "completed" }))
  }

  return (
    <S.StyledFilterButtonBlock>
      <UniversalButton
        title={"All"}
        onClickHandler={onAllClickHandler}
        currentFilter={props.filter}
        expectedFilter={"all"}
      />
      <UniversalButton
        title={"Active"}
        onClickHandler={onActiveClickHandler}
        currentFilter={props.filter}
        expectedFilter={"active"}
      />
      <UniversalButton
        title={"Completed"}
        onClickHandler={onCompletedClickHandler}
        currentFilter={props.filter}
        expectedFilter={"completed"}
      />
    </S.StyledFilterButtonBlock>
  )
}
