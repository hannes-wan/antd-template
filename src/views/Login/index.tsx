import React, {useEffect, useState} from "react";
import logo from '../../assets/logo.png'
import { Button, Checkbox, Form, Input, message} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import style from "../../styles/login.module.scss"
import {LoginForm} from "./types";
import {loginAPI} from "../../request/api";
import {useNavigate} from "react-router-dom";

// 需要添加一个方法，判断是否有user在localStorage里面，如果有，重定向到"/"，需要在渲染开始前执行
const Comp: React.FC = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (window.localStorage.getItem("user") !== null) {
            navigate("/")
            message.warning("You have logged in.")
        }
    }, [navigate]);

    const onFinish = async (values: LoginForm) => {
        setLoading(true)

        await loginAPI(values).then((resp: any) => {
            if (resp && resp.code === 200) {
                message.success(resp.message)
                if (resp.data !== undefined && resp.data !== null && Object.prototype.hasOwnProperty.call(resp.data, "token"))
                    window.localStorage.setItem("token", resp.data.token)

                navigate("/")
            }
        })

        setLoading(false)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div className={style.loginBackground}>
            <div className={style.loginMain}>
                <div className={style.loginContainer}>

                    {/*logo*/}
                    <div className={style.loginLogo}>
                        <a href={"/"}>
                            <img
                                width={150}
                                src={logo}
                                alt="logo"
                            />
                        </a>
                    </div>

                    {/* LoginForm */}
                    <Form
                        name="normal_login"
                        className={style.loginForm}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username or Email" />

                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <div>
                                    <Checkbox className={style.loginFormRemember}>Remember me</Checkbox>

                                    <a className={style.loginFormForgot} href="/forget">
                                        Forgot password
                                    </a>
                                </div>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={style.loginFormButton} loading={loading}>
                                Login
                            </Button>
                            Or <a href="/signup">register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
};

export default Comp;