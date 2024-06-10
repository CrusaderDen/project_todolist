import * as React from "react"
import Box from "@mui/material/Box"
import { Button, Checkbox, FormControl, FormControlLabel, TextField } from "@mui/material"

export function Login() {
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
      <p style={{ fontSize: "24px" }}>Welcome to the Todo-Land</p>
      <p style={{ fontSize: "16px" }}>
        Please, use test account. E-mail: <b>rupo@list.ru</b>, password: <b>123</b>
      </p>
      <FormControl sx={{ display: "flex", gap: "10px" }}>
        <TextField label="E-mail" type="email" autoComplete={"rupo@list.ru"} />
        <TextField label="Password" type="password" autoComplete={"123"} />
        <FormControlLabel label={"Remember me"} control={<Checkbox />} />
        <Button type={"submit"} variant={"contained"} color={"primary"}>
          Login
        </Button>
      </FormControl>
    </Box>
  )
}
