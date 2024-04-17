import React from 'react';
import {S} from "./_styles";
import {UniversalButton} from "./UniversalButton";
import {FilterValuesType} from "../../../App";


type FilterButtonsPropsType = {
    todolistId: string
    changeTodoListFilter: (filter: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
}


export const FilterButtons = (props: FilterButtonsPropsType) => {

    function onAllClickHandler() {
        props.changeTodoListFilter('all', props.todolistId)
    }

    function onActiveClickHandler() {
        props.changeTodoListFilter('active', props.todolistId)
    }

    function onCompletedClickHandler() {
        props.changeTodoListFilter('completed', props.todolistId)
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