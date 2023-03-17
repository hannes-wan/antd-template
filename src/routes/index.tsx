// 懒加载route
import React, {lazy} from "react"
import {
    DesktopOutlined,
    PieChartOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import { Navigate } from "react-router-dom"

// 如果是直接import About就是一个页面全部加载，所以用懒的方法来定义这个About
const Home = lazy(() => import("../views/Home"))
const Welcome = lazy(() => import("../views/Welcome"))
const About = lazy(() => import("../views/About"))
const BlogManagement = lazy(() => import("../views/Management/BlogManagement"))
const UserManagement = lazy(() => import("../views/Management/UserManagement"))
const Login = lazy(() => import("../views/Login"))
const NotFound = lazy(() => import("../views/Error/404"))
const Loading = lazy(() => import("../views/Loading"))
const Signup = lazy(() => import("../views/Signup"))
const SignupSuccess = lazy(() => import("../views/SignupSuccess"))
const Verify = lazy(() => import("../views/Verify"))

// 懒加载模式的组件的写法外面需要套 Loading 的提示加载组件
// 可以调用这个方法用React.Suspense来环绕需要懒加载的组件
const withLoadingComponent = (comp:JSX.Element) => (
    <React.Suspense fallback={
        <Loading/>
    }>
        {comp}
    </React.Suspense>
)

// 懒加载的模式需要我们给它添加一个Loading组件
const routes = [
    {
        path: "/",
        // 让 "/" 自动跳转到 "/welcome"
        element: <Navigate to = "/welcome"/>
    },
    {
        path: "/",
        element: <Home />,
        // 如果有嵌套路由就加上children，下面的都是子路由
        children: [
            {
                path: "/welcome",
                element: withLoadingComponent(<Welcome/>),

                // 自定义的，方便 Menu 写活 Route
                label: "Welcome",
                icon: <PieChartOutlined/>
            },
            {
                path: "/management",

                // 自定义的，方便 Menu 写活 Route
                label: "Management",
                icon: <QuestionCircleOutlined />,
                children: [
                    {
                        path: "/management/blog-management",
                        element: withLoadingComponent(<BlogManagement/>),

                        // 自定义的，方便 Menu 写活 Route
                        label: "Blog Management",
                        icon: <PieChartOutlined/>
                    },
                    {
                        path: "/management/user-management",
                        element: withLoadingComponent(<UserManagement/>),

                        // 自定义的，方便 Menu 写活 Route
                        label: "User Management",
                        icon: <PieChartOutlined/>
                    }
                ]
            },
            {
                path: "/about",
                element: withLoadingComponent(<About/>),

                // 自定义的，方便 Menu 写活 Route
                label: "About",
                icon: <QuestionCircleOutlined />
            }
        ]
    },
    {
        path: "/login",
        element: withLoadingComponent(<Login/>),
        icon: <DesktopOutlined/>
    },
    {
        path: "/signup",
        element: withLoadingComponent(<Signup/>),
        icon: <DesktopOutlined/>
    },
    {
        path: "/verify",
        element: withLoadingComponent(<Verify/>),
        icon: <DesktopOutlined/>
    },
    {
        path: "/signup_success",
        element: withLoadingComponent(<SignupSuccess/>),
        icon: <DesktopOutlined/>
    },
    {
        path: "*",
        element: withLoadingComponent(<NotFound/>)
    },
];

export default routes