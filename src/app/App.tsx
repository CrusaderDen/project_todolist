import React from "react"
import "./App.css"
import { useSelector } from "react-redux"
import { AppRootStateType } from "./store"
import { Clock } from "components/Clock/Clock"
import LinearProgress from "@mui/material/LinearProgress"
import { Box } from "@mui/material"
import { ErrorSnackBar } from "components/ErrorSnackBar/ErrorSnackBar"
import { RequestStatusType } from "./appReducer"
import { Outlet } from "react-router-dom"

function App() {
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  console.log("App is rendering")
  return (
    <div className="App">
      <div style={{ position: "fixed" }}>
        <ErrorSnackBar />
        <Box sx={{ width: "100vw" }}>
          {status === "loading" && <LinearProgress color="secondary" sx={{ height: "10px" }} />}
        </Box>
      </div>
      <Clock />
      <Outlet />
    </div>
  )
}

export default App
