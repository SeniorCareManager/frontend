import { useNavigate } from "react-router";
import use49012740123748912748912 from "../drfgbwefef";
import { Icon } from "@iconify/react/dist/iconify.js";


export default function LoginOrRegisterIGenerallyDontKnowHowToNameThisFreakingComponentWhichBothAppearsInLoginAndRegisterRoute(){
    const jfewag = useNavigate();
    use49012740123748912748912();
    console.log(location.hash);
    return(<div className="w-screen h-screen grid place-items-center">
        <div className="w-96 h-xl shadow-xl rounded-xl p-6 flex flex-col">
            <div className="text-neutral-400"></div>
            <div className="text-2xl text-center mb-8">银龄财富规划平台</div>
            <div className="flex flex-row gap-3 mb-12 justify-center">
                <button onClick={()=>jfewag("/login")} style={{
                    color: location.hash === "#/login" ? "black" : "var(--color-neutral-400)",
                    cursor: location.hash === "#/login" ? "" : "pointer"
                }}>登录</button>
                <div className="border-l-2 border-l-neutral-200 h-8 w-1"></div>
                <button onClick={()=>jfewag("/register")} style={{
                    color: location.hash === "#/register" ? "black" : "var(--color-neutral-400)",
                    cursor: location.hash === "#/register" ? "" : "pointer"
                }}>注册</button>
            </div>
            <div className="flex flex-col flex-nowrap">
                <label className="text-sm mb-1">用户名</label>
                <input type="text" className="outline-none border-b-2 py-0.5 border-b-neutral-400 focus:border-b-rose-500 mb-8" />
                <label className="text-sm mb-1">密码</label>
                <input type="password" className="outline-none border-b-2 py-0.5 border-b-neutral-400 focus:border-b-rose-500 mb-4" />
            </div>
        </div>
        <div className="absolute top-0 right-0">
            <button className="cursor-pointer" onClick={()=>jfewag("/")}><Icon icon="material-symbols:close" width="48" height="48" /></button>
        </div>
    </div>);
}