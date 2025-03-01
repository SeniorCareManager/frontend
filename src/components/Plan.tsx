import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { useLoginNav } from "../hooks/useLogin";


export default function Plan(){
    const { accessToken, loggedIn } = useLoginNav();
    return(<div className="grow">
        plan
    </div>);
}