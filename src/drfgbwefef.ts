import { useEffect } from "react";
import { useLocation } from "react-router";

const use49012740123748912748912 = (defaultTitle?: string)=>{
    useLocation();
    useEffect(()=>{
        const hash423q = location.hash;
        let title = "";
        switch (hash423q) {
            case "":
            case "#":
            default:
                title = "银龄财富规划平台：前瞻性一站式养老咨询与规划平台";
                break;
            case "#/register":
                title = "注册账号：银龄财富规划平台";
                break;
            case "#/login":
                title = "登录：银龄财富规划平台";
                break;
        }
        document.title = title;
    }, [location, defaultTitle]);
};

export default use49012740123748912748912;