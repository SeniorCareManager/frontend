import { useCheckLoginNav } from "../hooks/useCheckLoginNav";
import background from "../assets/general3.png";
import { ConfigProvider, StepProps, Steps, theme } from "antd";
import { useState } from "react";
import { Questionnaire } from "./Questionnaire";

const items :StepProps[] = [
    {
        title: "填写问卷"
    },
    {
        title: "生成画像"
    },
    {
        title: "查阅报告"
    }
];

export default function Plan(){
    const { accessToken, loggedIn, initialzing, setLogin } = useCheckLoginNav();
    const [currentStep, setCurrentStep] = useState(0);
    return(<div className="grow flex flex-row justify-center h-full" style={{
        backgroundSize: "100% 100%",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${background})`
    }}>
        <div className="flex flex-col w-60 py-16 pl-2"><ConfigProvider theme={{algorithm: theme.defaultAlgorithm, components: {Steps: {fontSize: 24, fontSizeLG: 20, iconSize: 32}}}}>
            <h1 className="mb-6 text-2xl">定制方案流程</h1>
            <Steps
                direction="vertical"
                current={currentStep}
                items={items}
            />
        </ConfigProvider></div>
        <div className="w-160"><Questionnaire /></div>
        <div className="flex flex-col justify-center px-16 py-2" style={{writingMode: "vertical-lr"}}>
            <h1 className="mt-16">银龄财富蓝图</h1>
            <h1 className="mt-32">从一张问卷开始</h1>
        </div>
    </div>);
}