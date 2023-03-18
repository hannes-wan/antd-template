// 懒加载route
import React, {lazy} from "react"
import {
    DesktopOutlined,
    IdcardOutlined,
    KeyOutlined,
    PieChartOutlined,
    QuestionCircleOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Navigate } from "react-router-dom"

// 如果是直接import About就是一个页面全部加载，所以用懒的方法来定义这个About
const Home = lazy(() => import("../views/Home"))
const Welcome = lazy(() => import("../views/Home/Welcome"))
const About = lazy(() => import("../views/Home/About"))
const BlogManagement = lazy(() => import("../views/Home/Management/BlogManagement"))
const UserManagement = lazy(() => import("../views/Home/Management/UserManagement"))
const Login = lazy(() => import("../views/Login"))
const NotFound = lazy(() => import("../views/Error/404"))
const Loading = lazy(() => import("../views/Loading"))
const Signup = lazy(() => import("../views/Signup"))
const SignupSuccess = lazy(() => import("../views/SignupSuccess"))
const Verify = lazy(() => import("../views/Verify"))
const Settings = lazy(() => import("../views/Settings"))
const Profile = lazy(() => import("../views/Settings/Account/Profile"))
const Secure = lazy(() => import("../views/Settings/Account/Secure"))
const Web = lazy(() => import("../views/Settings/System/Web"))
const Subscribe = lazy(() => import("../views/Settings/System/Subscribe"))
const Test = lazy(() => import("../views/Settings/Test"))

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
        element: <Navigate to = "/home"/>
    },
    {
        path: "/home",
        // 让 "/" 自动跳转到 "/welcome"
        element: <Navigate to = "/home/welcome"/>
    },
    {
        path: "/home",
        label: "Home",
        element: withLoadingComponent(<Home />),
        // 如果有嵌套路由就加上children，下面的都是子路由
        children: [
            {
                path: "/home/welcome",
                element: withLoadingComponent(<Welcome/>),
                // 自定义的，方便 Menu 写活 Route
                label: "Welcome",
                icon: <PieChartOutlined/>
            },
            {
                path: "/home/management",
                label: "Management",
                icon: <QuestionCircleOutlined />,
                children: [
                    {
                        path: "/home/management/blog-management",
                        element: withLoadingComponent(<BlogManagement/>),
                        label: "Blog Management",
                        icon: <PieChartOutlined/>
                    },
                    {
                        path: "/home/management/user-management",
                        element: withLoadingComponent(<UserManagement/>),
                        label: "User Management",
                        icon: <PieChartOutlined/>
                    }
                ]
            },
            {
                path: "/home/about",
                element: withLoadingComponent(<About/>),
                label: "About",
                icon: <QuestionCircleOutlined />
            }
        ]
    },
    {
        path: "/settings",
        // 让 "/" 自动跳转到 "/welcome"
        element: <Navigate to = "/settings/account/profile"/>
    },
    {
        path: "/settings",
        label: "Settings",
        element: withLoadingComponent(<Settings />),
        // 如果有嵌套路由就加上children，下面的都是子路由
        children: [
            {
                path: "/settings/account",
                label: "Account",
                icon: <UserOutlined />,
                children: [
                    {
                        path: "/settings/account/profile",
                        element: withLoadingComponent(<Profile/>),
                        label: "Profile",
                        icon: <IdcardOutlined/>
                    },
                    {
                        path: "/settings/account/secure",
                        element: withLoadingComponent(<Secure/>),
                        label: "Secure",
                        icon: <KeyOutlined/>
                    }
                ]
            },
            {
                path: "/settings/system",
                label: "System",
                icon: <UserOutlined />,
                children: [
                    {
                        path: "/settings/system/web",
                        element: withLoadingComponent(<Web/>),
                        label: "Web",
                        icon: <IdcardOutlined/>
                    },
                    {
                        path: "/settings/system/subscribe",
                        element: withLoadingComponent(<Subscribe/>),
                        label: "Subscribe",
                        icon: <KeyOutlined/>
                    }
                ]
            },
            {
                path: "/settings/test",
                label: "Test",
                icon: <UserOutlined />,
                element: withLoadingComponent(<Test/>)
            }
        ]
    },
    {
        path: "/login",
        label: "Login",
        element: withLoadingComponent(<Login/>),
        icon: <DesktopOutlined/>
    },
    {
        path: "/signup",
        label: "Signup",
        element: withLoadingComponent(<Signup/>),
        icon: <DesktopOutlined/>
    },
    {
        path: "/verify",
        label: "Verify",
        element: withLoadingComponent(<Verify/>),
        icon: <DesktopOutlined/>
    },
    {
        path: "/signup_success",
        label: "Signup Success",
        element: withLoadingComponent(<SignupSuccess/>),
        icon: <DesktopOutlined/>
    },
    {
        path: "*",
        element: withLoadingComponent(<NotFound/>)
    },
];

export default routes