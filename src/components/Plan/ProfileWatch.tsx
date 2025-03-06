import { useEffect, useState } from "react";

export default function ProfileWatch({advanceTo2} :{advanceTo2 :()=>void}){
    const [complete, setComplete] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setComplete(true);
        } , 5000);
    }, []);
    return(<div className="flex flex-col py-16 h-full overflow-y-auto">
        <div>生成画像中……</div>
        <div className="mt-8 flex flex-row justify-center">
            <button className="w-48 cursor-pointer disabled:cursor-not-allowed px-8 py-6 mb-4 rounded-3xl text-lg duration-150 bg-yellow-200 disabled:bg-neutral-300 hover:not-[:disabled]:bg-yellow-300/70 active:not-[:disabled]:bg-yellow-200/80" onClick={advanceTo2} disabled={!complete}>查看报告</button>
        </div>
    </div>);
}