import * as React from "react"
import Box from "@mui/material/Box"
import { Button, Checkbox, FormControl, FormControlLabel, TextField } from "@mui/material"
import { useFormik } from "formik"

type ErrorType = {
  email?: string
  password?: string
}

export function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate(values) {
      const errors: ErrorType = {}
      if (!values.email.length) {
        errors.email = "Email is required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }
      if (!values.password.length) {
        errors.password = "Password is required"
      }
      return errors
    },
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2))
    },
  })
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
      <p style={{ fontSize: "16px" }}>Please, use test account.</p>
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
            name={"email"}
            label="E-mail"
            type="email"
            autoComplete="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
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
            name={"password"}
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
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
            name="rememberMe"
            control={<Checkbox />}
            onChange={formik.handleChange}
            checked={formik.values.rememberMe}
          />
          <Button type={"submit"} variant={"contained"} color={"primary"}>
            Login
          </Button>
        </FormControl>
      </form>
    </Box>
  )
}
