import { useNavigate } from "react-router";
import background from "../assets/mp_bg.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { routes } from "./App";

export default function MainPage(){
    const nav = useNavigate();
    return(<div className="flex flex-col grow">
        <div className="flex flex-row p-4 h-166 relative before:content-[''] before:absolute before:top-0 before:left-0 before:h-166 before:w-full before:backdrop-blur-[4px]" style={{
            backgroundSize: "50.1% 100%, 50% auto",
            backgroundPosition: "left top, right 80%",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundImage: `linear-gradient(to right, #f7f7f7, #fbbd36), url(${background})`
        }}>
            <div className="text-center m-4 py-4 z-1 rounded-sm">
                <h1 className="pb-8 text-6xl">遇见银龄　智启未来</h1>
                <div className="mt-4 mb-16 text-2xl">前瞻性一站式养老咨询与规划</div>
                <div className="flex flex-row justify-center gap-16 mb-8">
                    <button className="duration-50 rounded-[2px] h-36 w-40 text-2xl flex flex-col justify-center bg-amber-600/50 hover:bg-amber-600/60 active:bg-amber-600/40" onClick={()=>{
                        nav(routes.profile);
                    }}>
                        <div aria-hidden className="flex flex-row justify-center m-3"><Icon icon="icon-park-outline:data-file" width="48" height="48" /></div>
                        <div>定制化服务</div>
                    </button>
                    <button className="duration-50 rounded-[2px] h-36 w-40 text-2xl flex flex-col justify-center bg-amber-600/50 hover:bg-amber-600/60 active:bg-amber-600/40" onClick={()=>{
                        nav(routes.profile);
                    }}>
                        <div aria-hidden className="flex flex-row justify-center m-3"><Icon icon="token:chat" width="48" height="48" /></div>
                        <div>咨询顾问</div>
                    </button>
                </div>
                <div className="flex flex-row justify-center">
                    <button className="flex flex-row gap-4" onClick={()=>{
                        nav(routes.plan);
                    }}>
                        <h1 className="text-4xl p-6 rounded-[8rem/7rem] bg-yellow-400">养老方案制定</h1>
                        <div className="flex flex-row items-center mt-8">
                            <div className="text-2xl mr-2">立即填写问卷</div>
                            <Icon icon="gravity-ui:triangle-right-fill" className="text-yellow-900" width="20" height="20" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <footer className="grow bg-neutral-700 text-neutral-200 px-16 py-10 flex flex-row justify-around">
            <div className="flex flex-col gap-4 h-full justify-around">
                <div>©2025 银龄财富规划平台</div>
                <div>银龄智汇（成都）有限责任公司</div>
                <div><a href="https://beian.miit.gov.cn" target="_blank">蜀 ICP 备 xxx 号</a></div>
            </div>
            <div className="flex flex-col gap-4 h-full justify-around">
                <div>互联网金融执照：xxx</div>
                <div>其他执照：xxx</div>
                <div>公司地址：xxx</div>
                <div>联系电话：xxx（工作日 9:00-17:30）</div>
            </div>
        </footer>
    </div>);
}