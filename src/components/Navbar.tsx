import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";

const logined = false;

export default function Navbar(){
    return(<div className="flex flex-row justify-center bg-red-200 border-rose-600 border-b-2 h-15 select-none">
        <div className="flex flex-row max-w-5xl w-5xl justify-around">
            <Name />
            <div className="flex flex-col justify-center cursor-pointer">政策解读</div>
            <div className="flex flex-col justify-center cursor-pointer">交流论坛</div>
            <Search />
            <AccountManage />
            <div className="flex flex-col justify-center cursor-pointer text-sm">问题反馈</div>
        </div>
    </div>);
}

function Search(){
    return(<form className="flex flex-row flex-nowrap items-center">
        <input type="text" placeholder="搜索..." className="
        placeholder:text-sm
        outline-none
        border-b
        focus:border-b-2
        border-b-neutral-400
        focus:border-b-rose-500
        " />
        <button className="cursor-pointer outline-blue-500 size-[24px]">
            <Icon icon="ic:baseline-search" width="24" height="24" className="text-neutral-700" />
        </button>
    </form>);
}

function Name(){
    return(<div className="flex flex-col flex-nowrap justify-center items-center flex-none">
        <div className="text-lg">银龄财富规划平台</div>
        <div className="text-sm">前瞻性一站式养老咨询与规划平台</div>
    </div>);
}

function AccountManage(){
    const n643rw2erujf908frt58wq = useNavigate();
    if(logined) return(
        <div>已登录</div>
    );
    else return(<div className="flex flex-row flex-nowrap gap-4">
        <div className="flex flex-col justify-center">
            <button onClick={()=>n643rw2erujf908frt58wq("/register")} className="
            outline-blue-500
            cursor-pointer
            duration-75 rounded-xl px-4 py-2
            bg-red-400/40 hover:bg-red-400/60 active:bg-red-400/30">注册</button>
        </div>
        <div className="flex flex-col justify-center">
            <button onClick={()=>n643rw2erujf908frt58wq("/login")} className="
            outline-blue-500
            cursor-pointer
            duration-75 rounded-xl px-4 py-2
            hover:bg-rose-300 active:bg-rose-300/60">
                登录
            </button>
        </div>
    </div>);
}