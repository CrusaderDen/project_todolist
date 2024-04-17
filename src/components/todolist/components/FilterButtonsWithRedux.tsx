import React from 'react';
import {S} from "./_styles";
import {UniversalButton} from "./UniversalButton";
import {FilterValuesType} from "../../../App";
import {ChangeTodolistFilterAC} from "../state/todolists-reducer";
import {useDispatch} from "react-redux";


type FilterButtonsPropsType = {
    todolistId: string
    filter: FilterValuesType
}


export const FilterButtonsWithRedux = (props: FilterButtonsPropsType) => {
    const dispatch = useDispatch()

    function onAllClickHandler() {
        dispatch(ChangeTodolistFilterAC(props.todolistId, 'all'))
    }

    function onActiveClickHandler() {
        dispatch(ChangeTodolistFilterAC(props.todolistId, 'active'))
    }

    function onCompletedClickHandler() {
        dispatch(ChangeTodolistFilterAC(props.todolistId, 'completed'))
    }

    return (
        <S.StyledFilterButtonBlock>
            <UniversalButton title={'All'} onClickHandler={onAllClickHandler} currentFilter={props.filter}
                             expectedFilter={'all'}/>
            <UniversalButton title={'Active'} onClickHandler={onActiveClickHandler} currentFilter={props.filter}
                             expectedFilter={'active'}/>
            <UniversalButton title={'Completed'} onClickHandler={onCompletedClickHandler} currentFilter={props.filter}
                             expectedFilter={'completed'}/>
        </S.StyledFilterButtonBlock>
    );
};