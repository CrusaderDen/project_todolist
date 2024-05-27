import { appReducer, InitialStateType, setAppErrorAC, setAppStatusAC } from "./appReducer"

let startState: InitialStateType

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
  }
})

test("correct error message should be set", () => {
  const endState = appReducer(startState, setAppErrorAC("Test message"))
  expect(endState.error).toBe("Test message")
})

test("correct status should be set", () => {
  const endState = appReducer(startState, setAppStatusAC({ status: "succeeded" }))
  expect(endState.status).toBe("succeeded")
})
