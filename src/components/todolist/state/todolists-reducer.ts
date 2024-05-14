import { v1 } from "uuid";
import { api, ServerTodolistType } from "../../../api/api";
//---------Initial state
export const todolistId1 = v1();
export const todolistId2 = v1();
const initialState: TodolistDomainType[] = [
  // {
  //   id: todolistId1,
  //   title: "What to learn",
  //   filter: "all",
  //   addedDate: "",
  //   order: 0,
  // },
  // {
  //   id: todolistId2,
  //   title: "What to buy",
  //   filter: "all",
  //   addedDate: "",
  //   order: 0,
  // },
];

//---------Reducer
export const todolistsReducer = (
  state = initialState,
  action: ActionsType,
): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.id);
    case "ADD-TODOLIST":
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: "all",
          addedDate: "",
          order: 0,
        },
        ...state,
      ];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl,
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl,
      );
    case "SET-TODOLISTS":
      return action.todolists.map((tl) => ({ ...tl, filter: "all" }));
    default:
      return state;
  }
};
//---------Action creators
export const RemoveTodolistAC = (
  todolistId: string,
): RemoveTodolistActionType =>
  ({ type: "REMOVE-TODOLIST", id: todolistId }) as const;
export const AddTodolistAC = (newTitle: string) =>
  ({ type: "ADD-TODOLIST", title: newTitle, todolistId: v1() }) as const;
export const ChangeTodolistTitleAC = (id: string, title: string) =>
  ({ type: "CHANGE-TODOLIST-TITLE", title, id }) as const;
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
  ({ type: "CHANGE-TODOLIST-FILTER", id, filter }) as const;
export const SetTodolistsAC = (todolists: ServerTodolistType[]) =>
  ({ type: "SET-TODOLISTS", todolists }) as const;
//---------AC Types
export type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | SetTodolistsActionType
  | ReturnType<typeof ChangeTodolistTitleAC>
  | ReturnType<typeof ChangeTodolistFilterAC>;
//---------AC Types for export
export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};
export type SetTodolistsActionType = {
  type: "SET-TODOLISTS";
  todolists: ServerTodolistType[];
};
//---------State Types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = ServerTodolistType & {
  filter: FilterValuesType;
};
//---------Thunks
export const fetchTodolistsTC = () => (dispatch: any) => {
  api.getTodolists().then((res) => {
    dispatch(SetTodolistsAC(res.data));
  });
};
