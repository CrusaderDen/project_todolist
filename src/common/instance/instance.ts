import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "750b834e-bc51-43bd-beec-013db0e3f0f0",
  },
})
