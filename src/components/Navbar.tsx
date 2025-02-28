import { Icon } from "@iconify/react";
import { Link, Links, NavLink } from "react-router";
import blackLogo from "../assets/black.png";

export default function Navbar(){
    return(<div className="flex flex-row justify-center bg-[#faddc0] border-rose-600 border-b-2 h-16 select-none">
        <div className="flex flex-row max-w-5xl w-5xl justify-around">
            <Link to="/" className="flex flex-row flex-nowrap justify-center items-center flex-none">
                <img src={blackLogo} width={90} />
                <div className="text-[1.5rem]">银龄财富规划</div>
            </Link>
            <NavLink to="/news" end className="flex flex-col justify-center cursor-pointer"><div className="text-lg p-1 border-t-2 border-b-2 border-transparent">政策窗口</div></NavLink>
            <NavLink to="/forum" end className="flex flex-col justify-center cursor-pointer"><div className="text-lg p-1 border-t-2 border-b-2 border-transparent">养老论坛</div></NavLink>
            <NavLink to="/pricing" end className="flex flex-col justify-center cursor-pointer"><div className="text-lg p-1 border-t-2 border-b-2 border-transparent">定价</div></NavLink>
            <div className="flex flex-row flex-nowrap gap-4">
                <div className="flex flex-col justify-center">
                    <Link to="/register" className="
                    outline-blue-500
                    cursor-pointer
                    duration-75 rounded-xl px-4 py-2
                    bg-red-400/20 hover:bg-red-400/60 active:bg-red-400/30">注册</Link>
                </div>
                <div className="flex flex-col justify-center">
                    <Link to="/login" className="
                    outline-blue-500
                    cursor-pointer
                    duration-75 rounded-xl px-4 py-2
                    hover:bg-rose-300 active:bg-rose-300/60">登录</Link>
                </div>
            </div>
            <NavLink to="/feedback" end className="flex flex-col justify-center cursor-pointer text-sm">问题反馈</NavLink>
        </div>
    </div>);
}