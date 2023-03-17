import { Button, message, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import { verifyAccountAPI } from '../../request/api';
import { VerifyInfo } from './types';

const View: React.FC = () => {

    const navigateTo = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [flag, setFlag] = useState<boolean>(true);

    useEffect(() => {
        
        async function verifyAccount() {

            const verifyInfo: VerifyInfo = {
                id: searchParams.get('id') as string,
                verifyCode: searchParams.get('verify_code') as string
            }

            console.log(searchParams.get('id') as string)
            console.log(searchParams.get('verify_code') as string)

            const resp: any = await verifyAccountAPI(verifyInfo);

            if (resp.code === 200) {
                message.success(resp.message);
                setFlag(true)

                // 3秒后自动跳转
                const redirect = setTimeout(() => {
                    navigateTo("/login")
                  }, 3000);
              
                return () => clearTimeout(redirect);
            } else {
                message.error("resp.message");
                setFlag(false)
            }
        }

        verifyAccount();

    });

    return flag ? 
    <Result
        status="success"
        title="The account has been successfully activated!"
        subTitle="If it didn't automatically jump to the login page within three seconds, please click Login to manually jump."
        extra={
            <Button type="primary" onClick={() => navigateTo("/login")}>
                Login
            </Button>
        }
    /> : 
    <Result
        status="error"
        title="The account has not been activated!"
        subTitle="Some errors have occurred, please contact the administrator."
        extra={
            <Button type="primary" onClick={() => navigateTo("/")}>
                Home
            </Button>
        }
    />

}

export default View;
