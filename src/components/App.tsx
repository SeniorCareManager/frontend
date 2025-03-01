import { createContext } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router";
import { MessageInstance } from "antd/es/message/interface";
import useMessage from "antd/es/message/useMessage";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";

import MainPage from "./MainPage";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import Feedback from "./Feedback";
import Forum from "./Forum";
import News from "./News";
import Pricing from "./Pricing";
import Plan from "./Plan";
import ResetPassword from "./ResetPassword";

export const routes = {
    main: "/",

    plan: "/plan",
    news: "/news",
    forum: "/forum",
    pricing: "/pricing",

    feedback: "/feedback",

    login: "/login",
    register: "/register",
    
    reset: "/reset"
} as const;

const t = {
    loggedIn: false,
    accessToken: ""
};

export const LoginStatusContext = createContext(t);
export const MessageContext = createContext({
    messageApi: null as MessageInstance | null
});

export default function App(){
    const [messageApi, contextHolder] = useMessage({top: 64});
    return(<LoginStatusContext.Provider value={t}>
        <MessageContext.Provider value={{messageApi}}>
            <ConfigProvider locale={zhCN} wave={{disabled: true}} theme={{token: {fontSize: 16}}}>
                {contextHolder}
                <HashRouter>
                    <Navbar />
                    <Routes>
                        <Route path={routes.main} index element={<MainPage />} />
                        <Route path={routes.plan} element={<Plan />} />
                        <Route path={routes.news} element={<News />} />
                        <Route path={routes.forum} element={<Forum />} />
                        <Route path={routes.pricing} element={<Pricing />} />
                        <Route path={routes.login} element={<Login />} />
                        <Route path={routes.register} element={<Register />} />
                        <Route path={routes.feedback} element={<Feedback />} />
                        <Route path={routes.reset} element={<ResetPassword />} />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </HashRouter>
            </ConfigProvider>
        </MessageContext.Provider>
    </LoginStatusContext.Provider>);
}