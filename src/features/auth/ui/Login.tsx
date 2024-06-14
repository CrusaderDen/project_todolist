import * as React from "react"
import Box from "@mui/material/Box"
import { Button, Checkbox, FormControl, FormControlLabel, TextField } from "@mui/material"
import { useFormik } from "formik"
import { AppRootStateType, useAppDispatch } from "app/store"
import { loginTC } from "features/auth/model/auth-reducer"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

type ErrorType = {
  email?: string
  password?: string
}

export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
}

export function Login() {
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate(values) {
      const errors: ErrorType = {}
      if (!values.email) {
        errors.email = "Email is required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }
      if (!values.password) {
        errors.password = "Password is required"
      }
      return errors
    },
    onSubmit: values => {
      dispatch(loginTC(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={"/todolists"} />
  }

  return (
    <Box
      sx={{
        height: "100dvh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <p style={{ fontSize: "24px" }}>Welcome to the Todo-Shaka-Laka-Lists</p>
      <p style={{ fontSize: "16px" }}>Please, use the test account:</p>
      <ul>
        <li>
          {" "}
          E-mail: <b>rupo@list.ru</b>
        </li>
        <li>
          {" "}
          password: <b>123</b>
        </li>
      </ul>

      <form onSubmit={formik.handleSubmit}>
        <FormControl sx={{ display: "flex", gap: "10px", position: "relative" }}>
          <TextField
            label="E-mail"
            type="email"
            autoComplete="email"
            {...formik.getFieldProps("email")}
            error={!!(formik.touched.email && formik.errors.email)}
          />
          {formik.touched.email && formik.errors.email ? (
            <div
              style={{
                color: "red",
                fontSize: "8px",
                position: "absolute",
                top: "20px",
                right: "250px",
                zIndex: "1",
                whiteSpace: "nowrap",
              }}
            >
              {formik.errors.email}
            </div>
          ) : null}
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            {...formik.getFieldProps("password")}
            error={!!(formik.touched.password && formik.errors.password)}
          />
          {formik.touched.password && formik.errors.password ? (
            <div
              style={{
                color: "red",
                fontSize: "8px",
                position: "absolute",
                top: "82px",
                right: "250px",
                zIndex: "1",
                whiteSpace: "nowrap",
              }}
            >
              {formik.errors.password}
            </div>
          ) : null}
          <FormControlLabel
            label={"Remember me"}
            control={<Checkbox />}
            checked={formik.values.rememberMe}
            {...formik.getFieldProps("rememberMe")}
          />
          <Button type={"submit"} variant={"contained"} color={"primary"}>
            Login
          </Button>
        </FormControl>
      </form>
    </Box>
  )
}
