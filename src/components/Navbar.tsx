import { Icon } from "@iconify/react";

export default function Navbar(){
    return(<div className="flex flex-row justify-center bg-red-200 border-amber-500 border-b-2 h-15">
        <div className="flex flex-row max-w-5xl w-5xl justify-around">
            <Name />
            <div>535424234234234234234234444444444444</div>
            <div>666</div>
            <Search />
            <AccountManage />
        </div>
    </div>);
}

function Search(){
    return(<div>
        <Icon icon="material-symbols-light:10mp-outline-sharp" width="24" height="24" />
    </div>);
}

function Name(){
    return(<div className="flex flex-col flex-nowrap justify-center items-center">
        <div className="text-lg">银龄财富规划平台</div>
        <div className="text-sm">前瞻性一站式养老咨询与规划平台</div>
    </div>);
}

function AccountManage(){
    return(<div className="flex flex-row flex-nowrap gap-4">
        <button className="cursor-pointer">注册</button>
        <button className="cursor-pointer">登录</button>
    </div>);
}