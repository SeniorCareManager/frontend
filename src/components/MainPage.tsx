import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import Popup from "./Popup";
import background from "../assets/background.jpg";

export default function MainPage(){
    return(<div>
        <div className="flex flex-row grow p-8 h-128" style={{
            backgroundSize: "50% 100%, 50% auto",
            backgroundPosition: "left top, right 50%",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundImage: `linear-gradient(#fbbd36, #fbbd36), url(${background})`
        }}>
            <div className="text-center pl-16">
                <h1 className="pb-8" style={{width: "9ic", fontSize: "4rem"}}>遇见银龄　智启未来</h1>
                <div style={{fontSize: "2rem"}}>前瞻性一站式 <span className="text-lg">养老</span>咨询与规划</div>
            </div>
            <div>

            </div>
            <ConfigProvider locale={zhCN} wave={{disabled: true}} theme={{
                token: {fontSize: 16}
            }}>
                <div className="flex grow flex-col flex-nowrap">
                    <Popup />
                </div>
            </ConfigProvider>
        </div>
        <div>
            asdf
        </div>
    </div>);
}