import { ConfigProvider } from "antd";
import Navbar from "./Navbar";
import Popup from "./Popup";
import zhCN from "antd/locale/zh_CN";

export default function MainPage(){
    return(
        <ConfigProvider locale={zhCN} wave={{disabled: true}} theme={{}}>
            <div className="flex flex-col flex-nowrap h-screen w-screen">
                <Navbar />
                <div className="grow">
                    <Popup />
                </div>
            </div>
        </ConfigProvider>
    );
}