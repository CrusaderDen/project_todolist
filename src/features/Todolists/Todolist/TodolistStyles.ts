import styled, { css, keyframes } from "styled-components"

const rotate360 = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

const StyledButton = styled.button<any>`
  cursor: pointer;
  user-select: none;
  border-radius: 3px;
  border: none;
  ${props =>
    props.filter === props.$expectedFilter &&
    props.$expectedFilter !== undefined &&
    css`
      background-color: rgba(155, 39, 175, 0.38);
      color: #000000;
    `}
`

const StyledTask = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & button {
    width: 20px;
    height: 20px;

    &:hover {
      background-color: #cfcfcf;
      color: red;
    }
  }
`

const StyledTodolist = styled.div`
  //background-image: linear-gradient(160deg, rgba(33, 212, 253, 0.8) 0%, rgba(183, 33, 255, 0.55) 100%);
  //box-shadow: 10px 10px 20px rgba(18, 107, 120, 0.9);
  box-shadow: 0 0 10px 2px rgb(0, 0, 0);
  border-radius: 5px;
  margin-top: 30px;
  padding: 20px;
  min-width: 400px;
  background-color: #feedcd;
`

const StyledHeader = styled.div`
  position: relative;
`
const StyledTaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
  border: 1px solid #9d9d9d;
  padding: 10px;
  margin: 20px 0;

  & li {
    list-style: none;
  }
`

const StyledButtonClose = styled.div`
  text-align: right;

  & button {
    width: 30px;
    height: 30px;
    transition: all 0.5s ease;

    &:hover {
      background-color: #cfcfcf;

      & span {
        animation: ${rotate360} 1s;
      }
    }
  }
`

const StyledInput = styled.input`
  height: 30px;
  width: 100%;
  border-radius: 5px;
  border: none;
  padding-left: 5px;

  &:focus {
    outline: none;
    border: none;
  }
`

const StyledFilterButtonBlock = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;

  & button {
    min-width: 81px;
    height: 25px;
    font-weight: 700;
    transition:
      transform 0.1s ease-in,
      background-color 0.1s ease-in;
    box-shadow: 2px 2px 5px;

    &:hover {
      transform: scale(1.05);
    }
  }
`

const StyleEmpty = styled.span`
  text-align: center;
`

const StyledTasksTitle = styled.h4`
  text-align: center;
  font-weight: 500;
  font-size: 18px;
  margin-top: 20px;
`

const StyledTaskTitle = styled.h3`
  text-align: center;
  margin: 30px 0;
`

export const S = {
  StyledButton,
  StyledTask,
  StyledTodolist,
  StyledHeader,
  StyledTaskList,
  StyledButtonClose,
  StyledInput,
  StyledFilterButtonBlock,
  StyleEmpty,
  StyledTasksTitle,
  StyledTaskTitle,
}
