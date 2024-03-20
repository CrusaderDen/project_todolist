import styled, {css, keyframes} from "styled-components";

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
    ${props => props.filter === props.$expectedFilter && props.$expectedFilter !== undefined && css`
        background-color: #b164fc;
        color: #000000;
    `}
`

const StyledTask = styled.div`
    display: flex;
    justify-content: space-between;

    & button {
        width: 20px;
        height: 20px;

        &:hover {
            background-color: #cfcfcf;
            color: red;
        }
    }

    & span {

        & input {
            cursor: pointer;
            margin-right: 10px;
            width: 18px;
            height: 18px;
            position: relative;
            top: 2px;

        }
    }

`

const StyledTodolist = styled.div`
    background-image: linear-gradient(160deg, rgba(33, 212, 253, 0.8) 0%, rgba(183, 33, 255, 0.55) 100%);
    //box-shadow: 10px 10px 20px rgba(18, 107, 120, 0.9);
    box-shadow: 0 0 10px 2px rgb(0, 0, 0);
    border-radius: 5px;
    padding: 20px;
    min-width: 303px;

`

const StyledHeader = styled.div`
    position: relative;
`
const StyledTaskList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 30px;
    border: 2px inset black;
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


const StyledInputBlock = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin: 20px 0;


    & button {
        //display: none;
        position: absolute;
        right: 0;
        height: 30px;
        width: 30px;
        border: none;
        border-left: 1px solid #cfcfcf;
        border-radius: 0 5px 5px 0;
        background-color: white;
        transition: all 0.3s;
        font-weight: 500;
        font-size: 24px;

        &:hover {
            background-color: #cfcfcf;
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
        transition: transform 0.1s ease-in, background-color 0.1s ease-in;
        box-shadow: 5px 5px 10px;

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

`

const StyledTaskTitle = styled.h3`
    text-align: center;
    margin: 20px 0;
`


export const S = {
    StyledButton,
    StyledTask,
    StyledTodolist,
    StyledHeader,
    StyledTaskList,
    StyledButtonClose,
    StyledInputBlock,
    StyledInput,
    StyledFilterButtonBlock,
    StyleEmpty,
    StyledTasksTitle,
    StyledTaskTitle

}