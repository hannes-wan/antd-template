import React, {lazy} from 'react';
import { Layout, theme } from 'antd';
import {Outlet} from "react-router-dom";

const { Content } = Layout;
const Header = lazy(() => import("../../components/Header"))
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"))
const Footer = lazy(() => import("../../components/Footer"))

const View: React.FC = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Header/>

            <Content className="site-layout" style={{ padding: '25px 100px' }}>
                <Breadcrumb/>

                <div style={{ padding: 24, minHeight: 500, background: colorBgContainer }}>
                    <Outlet/>
                </div>
            </Content>

            <Footer/>
        </Layout>
    );
};

export default View;