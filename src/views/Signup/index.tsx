import React, {useEffect, useState} from "react";
import logo from '../../assets/logo.png'
import { Button, Form, Input, message} from 'antd';
import { LockOutlined, UserOutlined, MailOutlined ,BarcodeOutlined } from '@ant-design/icons';
import style from "../../styles/signup.module.scss"
import {SignupForm} from "./types";
import { getCaptchaAPI, signupAPI } from '../../request/api';
import {useNavigate} from "react-router-dom";

// 需要添加一个方法，判断是否有user在localStorage里面，如果有，重定向到"/"，需要在渲染开始前执行
const View: React.FC = () => {

    const navigate = useNavigate()
    const [captcha, setCaptcha] = useState<string>('');
    const [loading, setLoading] = useState(false);

    async function fetchCaptcha() {
        const resp: any = await getCaptchaAPI();

        if (resp.code === 200) {
            const newCaptcha = "data:image/jpg;base64," + resp.data.captcha;
            setCaptcha(newCaptcha);
        }
    }

    useEffect(() => {
        
        async function fetchData() {
            if (window.localStorage.getItem("user") !== null) {
                navigate("/");
                message.warning("You have logged in.");
            }

            await fetchCaptcha();
        }

    fetchData();

    }, [navigate]);

    const onFinish = async (values: SignupForm) => {

        setLoading(true)

        await signupAPI(values).then((resp: any) => {
            if (resp && resp.code === 200) {
                message.success(resp.message)
                navigate("/signup_success")
            } else {
                fetchCaptcha()
            }
        })

        setLoading(false)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div className={style.signupBackground}>
            <div className={style.signupMain}>
                <div className={style.signupContainer}>

                    {/*logo*/}
                    <div className={style.signupLogo}>
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
                        name="normal_signup"
                        className={style.signupForm}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >

                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                placeholder="Email" />

                        </Form.Item>

                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username" />

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

                        <Form.Item
                            name="captchaCode"
                            rules={[{ required: true, message: 'Please input the captcha code!' }]}
                        >
                            <div>
                                <Input
                                    prefix={<BarcodeOutlined className="site-form-item-icon" />}
                                    type="captcha"
                                    placeholder="captcha"
                                    className={style.signupFormCaptchaInput}
                                />

                                <img 
                                    src={captcha} 
                                    alt="captcha" 
                                    className={style.signupFormCaptchaImage}
                                    onClick={fetchCaptcha}
                                />
                            </div>

                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={style.signupFormButton} loading={loading}>
                                Sign up
                            </Button>
                            Or <a href="/login">already have an account?</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
};

export default View;