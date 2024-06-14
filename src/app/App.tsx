import React, { useEffect } from "react"
import "./App.css"
import { useSelector } from "react-redux"
import { AppRootStateType, useAppDispatch } from "./store"
import { Clock } from "common/components/Clock/Clock"
import LinearProgress from "@mui/material/LinearProgress"
import { Box, CircularProgress } from "@mui/material"
import { ErrorSnackBar } from "common/components/ErrorSnackBar/ErrorSnackBar"
import { RequestStatusType } from "./appReducer"
import { Outlet } from "react-router-dom"
import { meTC } from "features/auth/model/auth-reducer"

function App() {
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(meTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "48%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }
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
