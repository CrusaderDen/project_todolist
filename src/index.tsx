import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./app/App"
import { Provider } from "react-redux"
import { store } from "app/store"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "features/Login/Login"
import { TodolistsList } from "features/Todolists/TodolistsLists"

// const settings = {
//   withCredentials: true,
//   headers: {
//     "API-KEY": "750b834e-bc51-43bd-beec-013db0e3f0f0",
//   },
// }
//
// const body = {
//   email: "rupo@list.ru",
//   password: "123",
//   rememberMe: true,
// }
//
// const auth = () => {
//   axios.post("https://social-network.samuraijs.com/api/1.1/auth/login", body, settings)
// }
//
// auth()

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "todolists",
          element: <TodolistsList />,
        },
      ],
    },
  ],
  {
    basename: "/project_todolist",
  },
)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
