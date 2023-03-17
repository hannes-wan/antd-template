import request from "./index"
import {LoginForm} from "../views/Login/types";

export const loginAPI = (values: LoginForm) => {

    return request({
        method: 'post',
        url: "/apis/account/login",
        params: {
            remember: values.remember,
        },
        data: {
            username: values.username,
            password: values.password
        }
    })
}

export const getAccountInfoAPI = () => {

    return request({
        method: 'get',
        url: "/apis/account/info",
    })
}

export const logoutAPI = () => {

    return request({
        method: 'post',
        url: "/apis/account/logout",
    })
}
