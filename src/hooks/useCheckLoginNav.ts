import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { LoginStatusContext, MessageContext, routes } from "../components/App";

export function useCheckLoginNav(){
    const { messageApi } = useContext(MessageContext);
    const c = useContext(LoginStatusContext);
    const nav = useNavigate();
    useEffect(()=>{
        if(!c.initialzing && !c.loggedIn){
            messageApi!.error("您未登录或登录状态失效，请重新登录");
            nav(routes.login, {replace: true, viewTransition: true});
        }
    }, [c.initialzing]);
    return c;
}