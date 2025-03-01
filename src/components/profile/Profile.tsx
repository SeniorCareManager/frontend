import { useCallback, useContext, useEffect, useState } from "react";
import { UserData } from "../../schema/user";
import meta from "../../meta";
import { whoami } from "../../schema/login";
import { useCheckLoginNav } from "../../hooks/useCheckLoginNav";
import { ConfigProvider, Input, Menu, MenuProps } from "antd";
import PInfo from "./PInfo";
import { useNavigate } from "react-router";
import { MessageContext, routes } from "../App";

const items :(Required<MenuProps>["items"][number])[] = [
    {
        label: "我的服务",
        key: "services"
    },
    {
        label: "我的顾问",
        key: "consultants"
    },
    {
        label: "我的投资画像",
        key: "profile"
    },
    {
        label: "我的投资方案",
        key: "invest"
    },
    {type: "divider"},
    {
        label: "个人设置",
        key: "settings"
    },
    {
        label: "退出账户",
        key: "exit"
    },
    {type: "divider"},
    {
        label: "咨询反馈",
        key: "feedback"
    }
];

export default function Profile({ tab } :{tab? :string}){
    const [user, setUser] = useState<UserData | null>(null);
    const { accessToken, initialzing, loggedIn, setLogin } = useCheckLoginNav();
    const [currentTab, setCurrentTab] = useState(tab ?? "services");
    const { messageApi } = useContext(MessageContext);
    const nav = useNavigate();
    useEffect(()=>{(async()=>setUser(await whoami()))()}, []);
    return(<div className="grow flex flex-row">
        <div className="flex flex-col w-72 items-center py-8 border-r-2 border-r-neutral-300">
            <div className="size-36 rounded-full overflow-clip mb-4 select-none"><img className="size-full nodrag" src={user?.avatar_url} /></div>
            <div className="mb-4">{user?.nickname}</div>
            <div className="select-none"><ConfigProvider theme={{components: {Menu: {
                itemSelectedColor: "#a6733e",
                itemSelectedBg: "#f0d983",
                padding: 91
            }}}}>
                <Menu defaultSelectedKeys={[currentTab]} onSelect={({item, key, keyPath, selectedKeys, domEvent})=>{
                    setCurrentTab(key);
                    if(key === "feedback") nav(routes.forum);
                    else if(key == "exit"){
                        setLogin(false, "");
                        nav(routes.main);
                        messageApi!.success("退出账户成功");
                    }
                }} items={items} />
            </ConfigProvider></div>
        </div>
        <div className="flex flex-col grow">
            {user !== null ? currentTab === "profile" ?
            <PInfo user={user} />
            : currentTab === "password" ?
            <div></div>
            : null : null
            }
        </div>
    </div>);
}