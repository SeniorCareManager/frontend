import { useCallback, useContext, useEffect, useState } from "react";
import { useCheckLoginNav } from "../hooks/useCheckLoginNav";
import meta from "../meta";
import { MessageContext } from "./App";
import { ForumLoginResponse } from "../schema/forumLogin";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function Forum(){
    const { accessToken, loggedIn, initialzing, setLogin } = useCheckLoginNav();
    const { messageApi } = useContext(MessageContext);
    const [src, setSrc] = useState("");
    const [loading, setLoading] = useState(true);
    const load = useCallback(()=>setLoading(false), []);
    useEffect(()=>{(async()=>{
        if(!initialzing){
            const response = fetch(`${meta.apiDomain}/v1/status/getForumToken`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            response.catch(e=>{messageApi!.error(JSON.stringify(e))});
            const data :ForumLoginResponse = await (await response).json();
            console.log(data);
            if(data.success) setSrc(`https://scmbbs.wjlo.cc/token-login?code=${data.forum_token}`);
            else messageApi!.error("登录论坛时出现错误！");
        }
    })()}, [initialzing]);
    return(<div className="grow flex flex-col justify-center">
        {loading ?
        <div className="flex flex-col items-center mb-32">
            <Spin indicator={<LoadingOutlined style={{fontSize: 64}} className="mb-16" spin />} />
            <div className="mb-4">加载中……</div>
            <div><b>请调整浏览器设置，允许第三方 Cookie，</b></div>
            <div><b>以自动登录论坛系统。</b></div>
        </div>
        : null}
        <iframe hidden={loading} className="h-full w-full" scrolling="no" src={src} onLoad={load} />
    </div>);
}