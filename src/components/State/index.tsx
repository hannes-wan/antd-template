import React, {useState, useEffect} from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Dropdown, Space, Avatar, Modal, message, Spin} from 'antd';
import {getAccountInfoAPI, logoutAPI} from "../../request/api";
import {useNavigate} from "react-router-dom";

function RenderState () {
    const navigate = useNavigate()

    const [isLoading, setLoading] = useState(true);
    const [user, setUser]: any = useState();

    useEffect(() => {
        getAccountInfoAPI().then((resp: any) => {
            if (resp && resp.code === 200) {
                const data = JSON.stringify(resp.data);
                setUser(JSON.parse(data))
                window.localStorage.setItem("user", data)
            } else {
                window.localStorage.removeItem("token")
                window.localStorage.removeItem("user")
            }
            setLoading(false)
        })
    }, []);

    const showLogoutModal = () => {
        Modal.confirm({
            title: 'Logout',
            content: 'Are you sure you want to logout?',
            onOk: () => {
                logoutAPI().then((resp: any) => {
                    if (resp && resp.code === 200) {
                        window.localStorage.removeItem("token")
                        window.localStorage.removeItem("user")
                        message.success(resp.message)
                        navigate("/")
                    }
                })
            }
        });
    };


    const items: MenuProps['items'] = [
        {
            label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                    settings
                </a>
            ),
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <a target="_blank" rel="noopener noreferrer" onClick={showLogoutModal}>
                    logout
                </a>
            ),
            key: '2',
        },
    ];

    if (isLoading) {
        return (
            <Spin size="small"/>
        )
    }

    if (!window.localStorage.getItem("user")) {
        return (
            <div>
                <a href={"/login"}>
                    Login
                </a>
            </div>
        )
    }

    else {
        return (
            <>
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space size={16} wrap>
                            <Avatar src={user.avatar} />
                            {user.username}
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </>
        )
    }
}

const Comp: React.FC = () => {
    return RenderState()
};

export default Comp;
