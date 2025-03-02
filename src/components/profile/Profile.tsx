import { useContext, useEffect, useState } from "react";
import { UserData } from "../../schema/user";
import { whoami } from "../../schema/login";
import { useCheckLoginNav } from "../../hooks/useCheckLoginNav";
import { ConfigProvider, Input, Menu, MenuProps } from "antd";
import PInfo from "./PInfo";
import { useNavigate } from "react-router";
import { MessageContext, routes } from "../App";
import Feedback from "./Feedback";
import Settings from "./Settings";
import { Icon } from "@iconify/react/dist/iconify.js";
import InvestPlan from "./InvestPlan";
import Consultant from "./Consultant";
import Services from "./Services";

const keys = {
    services: "services",
    consultants: "consultants",
    profile: "profile",
    invest: "invest",
    settings: "settings",
    exit: "exit",
    feedback: "feedback"
} as const;

const items :(Required<MenuProps>["items"][number])[] = [
    {
        label: "我的服务",
        key: keys.services,
        className: "!flex !flex-row !items-center",
        icon: <Icon icon="iconoir:page-star" width="24" height="24" />
    },
    {
        label: "我的顾问",
        key: keys.consultants,
        className: "!flex !flex-row !items-center",
        icon: <Icon icon="mdi:customer-service" width="24" height="24" />
    },
    {
        label: "我的投资画像",
        key: keys.profile,
        className: "!flex !flex-row !items-center",
        icon: <Icon icon="iconoir:user-square" width="24" height="24" />
    },
    {
        label: "我的投资方案",
        key: keys.invest,
        className: "!flex !flex-row !items-center",
        icon: <Icon icon="iconamoon:trend-up-light" width="24" height="24" />
    },
    {type: "divider"},
    {
        label: "个人设置",
        key: keys.settings,
        className: "!flex !flex-row !items-center",
        icon: <Icon icon="mdi-light:settings" width="24" height="24" />
    },
    {
        label: "退出账户",
        key: keys.exit,
        danger: true,
        className: "!flex !flex-row !items-center",
        icon: <Icon icon="mingcute:exit-line" width="24" height="24" />
    },
    {type: "divider"},
    {
        label: "咨询反馈",
        key: keys.feedback,
        className: "!flex !flex-row !items-center",
        icon: <Icon icon="fluent:person-feedback-16-regular" width="24" height="24" />
    }
];

export default function Profile({ tab } :{tab? :string}){
    const [user, setUser] = useState<UserData | null>(null);
    const { accessToken, initialzing, loggedIn, setLogin } = useCheckLoginNav();
    const [currentTab, setCurrentTab] = useState(tab ?? "services");
    const { messageApi } = useContext(MessageContext);
    const nav = useNavigate();
    useEffect(()=>{(async()=>setUser(await whoami()))()}, []);
    return(<div className="grow flex flex-row h-full">
        <div className="flex flex-col w-72 items-center py-8 border-r-2 border-r-neutral-300">
            <div className="size-36 rounded-full overflow-clip mb-4 select-none"><img className="size-full nodrag" src={user?.avatar_url} /></div>
            <div className="mb-4">{user?.nickname}</div>
            <div className="select-none"><ConfigProvider theme={{components: {Menu: {
                itemSelectedColor: "#a6733e",
                itemSelectedBg: "#f0d983",
                padding: 75
            }}}}>
                <Menu defaultSelectedKeys={[currentTab]} onSelect={({item, key, keyPath, selectedKeys, domEvent})=>{
                    setCurrentTab(key);
                    switch(key){
                        case "exit":
                            setLogin(false, "");
                            nav(routes.main);
                            messageApi!.success("退出账户成功");
                            break;
                    }
                }} items={items} />
            </ConfigProvider></div>
        </div>
        <div className="flex flex-col grow">
            {user !== null ?
              currentTab === keys.services ? <Services user={user} />
            : currentTab === keys.consultants ? <Consultant user={user} />
            : currentTab === keys.profile ? <PInfo user={user} />
            : currentTab === keys.invest ? <InvestPlan user={user} />
            : currentTab === keys.settings ? <Settings user={user} />
            : currentTab === keys.feedback ? <Feedback user={user} />
            : null : null
            }
        </div>
    </div>);
}