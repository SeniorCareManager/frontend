import { useContext, useEffect, useState } from "react";
import { useCheckLoginNav } from "../hooks/useCheckLoginNav";
import meta from "../meta";
import { MessageContext } from "./App";
import { ForumLoginResponse } from "../schema/forumLogin";

export default function Forum(){
    const { accessToken, loggedIn, initialzing, setLogin } = useCheckLoginNav();
    const { messageApi } = useContext(MessageContext);
    const [src, setSrc] = useState("");
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
    return(<div className="grow">
        <iframe seamless className="h-full w-full" src={src}>
        </iframe>
    </div>);
}