import React, { lazy } from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from "react-router-dom";
import SettingsSider from '../../components/SettingsSider';

const Header = lazy(() => import("../../components/Header"))
const Breadcrumb = lazy(() => import("../../components/SettingsBreadcrumb"))
const Footer = lazy(() => import("../../components/Footer"))
const { Content } = Layout;

const View: React.FC = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Header />
            <Content style={{ padding: '25px 100px' }}>
                <Breadcrumb />

                <Layout style={{ padding: '10px 0', background: colorBgContainer}} >
                    <SettingsSider />

                    <Content style={{ padding: '10px 75px' }}>
                        <div style={{ padding: 24, minHeight: 500, background: colorBgContainer }}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Content>

            <Footer />
        </Layout>
    );
};

export default View;