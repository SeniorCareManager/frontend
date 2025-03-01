import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { LoginStatusContext, MessageContext, routes } from "../components/App";

export function useLoginNav(){
    const { messageApi } = useContext(MessageContext);
    const { loggedIn, accessToken } = useContext(LoginStatusContext);
    const nav = useNavigate();
    useEffect(()=>{
        if(!loggedIn){
            messageApi!.error("您未登录，重定向至登录页面……");
            nav(routes.login, {replace: true});
        }
    }, []);
    return { loggedIn, accessToken };
}