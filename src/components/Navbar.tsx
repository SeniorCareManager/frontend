import { Link, NavLink } from "react-router";
import blackLogo from "../assets/black.png";
import { LoginStatusContext, routes } from "./App";
import { useContext } from "react";

export default function Navbar(){
    const { loggedIn } = useContext(LoginStatusContext);
    return(<div className="flex flex-row justify-center bg-[#f9e1aa] border-rose-600 border-b-2 h-16 select-none px-4 sticky">
        <div className="flex flex-row max-w-5xl w-5xl justify-around">
            <Link to="/" className="flex flex-row flex-nowrap justify-center items-center flex-none m-2" style={{clipPath: "margin-box"}}>
                <img alt="银龄财富规划 Logo" src={blackLogo} width={90} className="outline-none mr-[-10px]" />
                <div className="text-[1.5rem]">银龄财富规划</div>
            </Link>
            <div className="flex flex-row gap-8 shrink">
                <NavLink to={routes.plan} end className="flex flex-col justify-center my-2 rounded-lg"><div className="text-lg p-1 border-t-2 border-b-2 border-transparent">养老方案</div></NavLink>
                <NavLink to={routes.news} end className="flex flex-col justify-center my-2 rounded-lg"><div className="text-lg p-1 border-t-2 border-b-2 border-transparent">政策窗口</div></NavLink>
                <NavLink to={routes.forum} end className="flex flex-col justify-center my-2 rounded-lg"><div className="text-lg p-1 border-t-2 border-b-2 border-transparent">养老论坛</div></NavLink>
            </div>
            <div className="flex flex-row flex-nowrap gap-3">
                {loggedIn ?
                <NavLink to={routes.profile} end className="flex flex-col justify-center my-2 rounded-lg"><div className="text-lg p-1 border-t-2 border-b-2 border-transparent">个人中心</div></NavLink> :
                <><div className="flex flex-col justify-center">
                    <Link to={routes.register} className="
                    duration-75 rounded-xl px-4 py-2 bg-red-400/20 hover:bg-red-400/60 active:bg-red-400/30">注册</Link>
                </div>
                <div className="flex flex-col justify-center">
                    <Link to={routes.login} className="
                    duration-75 rounded-xl px-4 py-2 bg-orange-400/20 hover:bg-rose-300/90 active:bg-rose-300/60">登录</Link>
                </div></>}
                <div className="flex flex-col justify-center">
                    <Link to={routes.login} className="duration-75 rounded-xl px-4 py-2 bg-yellow-400/30 hover:bg-yellow-300/80 active:bg-yellow-300/50">开通会员</Link>
                </div>
            </div>
        </div>
    </div>);
}