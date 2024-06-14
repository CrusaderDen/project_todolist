import { instance } from "common/instance/instance"
import { LoginParamsType, UserType } from "features/auth/api/authApi.types"
import { ResponseType } from "common/types/ResponseType"

export const authAPI = {
  me() {
    return instance.get<ResponseType<UserType>>("/auth/me")
  },
  logIn(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId: number }>>("/auth/login", data)
  },
  logOut() {
    return instance.delete("/auth/login")
  },
}
