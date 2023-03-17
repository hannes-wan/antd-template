import request from "./index"
import {LoginForm} from "../views/Login/types";
import { SignupForm } from "../views/Signup/types";
import { VerifyInfo } from "../views/Verify/types";
import { verify } from "crypto";

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

export const signupAPI = (values: SignupForm) => {

    return request({
        method: 'post',
        url: "/apis/account/signup",
        params: {
            captchaCode: values.captchaCode,
        },
        data: {
            username: values.username,
            email: values.email,
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

export const getCaptchaAPI = () => {
    return request({
        method: 'get',
        url: "/apis/captcha"
    })
}

export const verifyAccountAPI = (values: VerifyInfo) => {
    return request({
        method: 'patch',
        url: "/apis/account/verify",
        params: {
            id: values.id,
            verifyCode: values.verifyCode
        },
    })
}

