import React from 'react';
import { Header } from "antd/es/layout/layout";
import { Menu } from "antd";
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import routes from "../../routes";
import logo from "../../assets/logo.png";
import State from './State';

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

function routeToMenuItem(route: any): MenuItem {
    let childrenArray: any[] = []
    if (route.hasOwnProperty("children")) {
        route.children.forEach((child: any) => {
            childrenArray.push(routeToMenuItem(child))
        })
    }

    return childrenArray.length === 0 ?
        route.hasOwnProperty("icon") ? getItem(route.label, route.path, route.icon) : getItem(route.label, route.path) :
        route.hasOwnProperty("icon") ? getItem(route.label, route.path, route.icon, childrenArray) : getItem(route.label, route.path, childrenArray);
}

// 调用匿名函数初始化 items
const items: MenuItem[] = (function (routes: any[]) {
    let menuItems: MenuItem[] = [];
    routes.find((route) => route.path === "/home" && route.hasOwnProperty("children")).children.forEach((child: any) => {
        menuItems.push(routeToMenuItem(child))
    });

    return menuItems;
})(routes);

const Comp: React.FC = () => {

    const navigateTo = useNavigate()
    const currentRoute = useLocation()

    return (
        <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', backgroundColor: "white" }}>

            {/*logo*/}
            <div
                style={{
                    textAlign: "center",
                    float: 'left',
                    margin: 'auto 46px auto 0',
                }}
            >
                <a href={"/"}>
                    <img
                        width={65}
                        src={logo}
                        alt="logo"
                    />
                </a>
            </div>

            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={[currentRoute.pathname]}
                items={items}
                onClick={(e: { key: string }) => { navigateTo(e.key) }}
                style={{ float: "left" }}
            />

            <div style={{ float: "right", marginRight: "50px" }}>
                <State />
            </div>

        </Header>
    )
};
export default Comp;
