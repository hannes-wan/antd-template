import React from 'react';
import {Breadcrumb} from "antd";
import {useLocation} from "react-router-dom";
import routes from "../../routes";

const Comp: React.FC = () => {
    const currentRoute = useLocation()

    let breadcrumbs: string[] = function () {
        let breadcrumbs: string[] = []
        const route = routes.find((route) => route.path === "/" && route.hasOwnProperty("children")) as any;
        breadcrumbs.push("Home")
        for (let i = 0; i < route.children.length; i++) {
            if (route.children[i].path === currentRoute.pathname ) {
                breadcrumbs.push(route.children[i].label)
                break
            }

            if (route.children[i].hasOwnProperty("children")
                && route.children[i].children.length !== 0
                && route.children[i].children.find((child: any) => child.path === currentRoute.pathname)) {
                breadcrumbs.push(route.children[i].label)
                breadcrumbs.push(route.children[i].children.find((child: any) => child.path === currentRoute.pathname).label)
                break
            }
        }

        return breadcrumbs
    } ();

    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            {/* 每个元素都必须有一个特定的key */}
            {breadcrumbs.map((breadcrumb: string, index: number) => (<Breadcrumb.Item key={index}>{breadcrumb}</Breadcrumb.Item>))}
        </Breadcrumb>
    )
};

export default Comp;
