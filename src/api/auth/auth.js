import httpService from "../httpService"

export const loginApi = (values) => {
    return httpService("/auth/login", "post", {
      ...values,
      remember: values.remember ? 1 : 0,
    })
}

export const logoutApi = () => {
    return httpService("/auth/logout", "get")
}

export const getUserApi = () => {
    return httpService("/auth/user", "get")
}