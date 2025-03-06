import { useCheckLoginNav } from "../../hooks/useCheckLoginNav";
import background from "../../assets/general3.png";
import { ConfigProvider, StepProps, Steps, theme } from "antd";
import { useState } from "react";
import { Questionnaire } from "./Questionnaire";
import PlanNotice from "./PlanNotice";
import ProfileWatch from "./ProfileWatch";
import Report from "./Report";
import { Icon } from "@iconify/react/dist/iconify.js";

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
    const [currentStep, setCurrentStep] = useState(-1);
    return(<div className="grow flex flex-row justify-center h-full" style={{
        backgroundSize: "100% 100%",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${background})`
    }}>
        {
            currentStep >= 0 ? 
            <>
                <div className="flex flex-col w-60 py-16 pl-2"><ConfigProvider theme={{components: {Steps: {fontSize: 20, fontSizeLG: 20, iconSize: 36}}}}>
                    <h1 className="mb-6 text-2xl">定制方案流程</h1>
                    <Steps
                        direction="vertical"
                        current={currentStep}
                        items={items}
                    />
                </ConfigProvider></div>
                <div className="w-160">
                    {currentStep === 0 ?
                    <Questionnaire advanceTo1={()=>setCurrentStep(1)} />
                    : currentStep === 1 ?
                    <ProfileWatch advanceTo2={()=>setCurrentStep(2)} />
                    : currentStep === 2 ?
                    <Report />
                    : null
                    }
                </div>
                <div className="flex flex-col px-2">
                    {currentStep === 2 ?
                    <div className="mt-40 flex flex-col gap-2">
                        <h3>报告需要进一步解读？</h3>
                        <button className="flex flex-row items-center gap-2 w-fit cursor-pointer p-2 rounded-xl text-lg duration-150 bg-rose-500/50 hover:bg-rose-500/60 active:bg-rose-500/40">一键咨询<Icon icon="lets-icons:comment" width="24" height="24" /></button>
                        <button className="flex flex-row items-center gap-2 w-fit cursor-pointer px-4 py-2 rounded-xl text-lg duration-150 bg-amber-500/50 hover:bg-amber-500/60 active:bg-amber-500/40">预约咨询</button>
                    </div>
                    : <div className="text-4xl self-center text-[#ff9800]" style={{
                        writingMode: "vertical-lr",
                        fontFamily: "huawenxingkai, sans-serif",
                        lineHeight: "3rem",
                        letterSpacing: ".3rem"
                    }}>
                        <div className="mt-32">银龄财富蓝图</div>
                        <div className="mt-48">从一张问卷开始</div>
                    </div>}
                </div>
            </>:
            <div className="flex flex-col items-center h-full">
                <PlanNotice />
                <button onClick={()=>setCurrentStep(0)} className="w-fit cursor-pointer px-8 py-6 mb-4 rounded-3xl text-lg duration-150 bg-yellow-200 hover:bg-yellow-300/70 active:bg-yellow-200/80">进入方案制定</button>
            </div>
        }
    </div>);
}