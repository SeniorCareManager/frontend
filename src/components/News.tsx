import { useCallback, useContext, useEffect, useState } from "react";
import { GetNewsDetailResponse, GetNewsResponse, News1 } from "../schema/news";
import meta from "../meta";
import { MessageContext } from "./App";
import picture1 from "../assets/图片1.png";
import picture2 from "../assets/图片2.png";
import picture4 from "../assets/图片4.png";

const newsType = {
    "01": "法律法规",
    "02": "政策文件",
    "03": "标准规范",
    "04": "新闻报道"
};

export default function News(){
    const { messageApi } = useContext(MessageContext);
    const [newsList, setNewsList] = useState<News1[]>([]);
    const [currentNews, setCurrentNews] = useState<GetNewsDetailResponse["message"]>();
    useEffect(()=>{(async()=>{
        const request = fetch(`${meta.apiDomain}/v1/news/getInfo`, {method: "GET"});
        request.catch(e=>messageApi!.error("获取新闻出错！"));
        const message :GetNewsResponse = await(await request).json();
        if(!message.success) messageApi!.error(message.message as unknown as string);
        else setNewsList(message.message);
    })()}, []);
    const getNews = useCallback(async (id :string)=>{
        const request = fetch(`${meta.apiDomain}/v1/news/getDetail?id=${id}`, {method: "GET"});
        request.catch(e=>messageApi!.error("获取新闻详情出错！"));
        const message :GetNewsDetailResponse = await(await request).json();
        if(!message.success) messageApi!.error(message.message as unknown as string);
        else setCurrentNews(message.message);
    }, []);
    return(<div className="grow bg-[#f5f1ef] flex flex-col p-4 gap-2">
        <div className="grow flex flex-col p-4 items-center border-2 border-black">
            {currentNews ?
            <div>
                <button onClick={()=>setCurrentNews(undefined)} className="absolute bg-neutral-300/60 hover:bg-neutral-300/40 active:bg-neutral-300/90 duration-150 top-24 left-8 p-2 rounded-xl backdrop-blur-xs">←返回</button>
                <h1 className="mt-10 mb-6 text-center">{currentNews.title}</h1>
                <div className="my-8">
                    {currentNews.author && <div>作者：{currentNews.author}</div>}
                    {currentNews.source && <div>来源：{currentNews.source}</div>}
                    {currentNews.theme && <div>主题：{currentNews.theme}</div>}
                    {currentNews.time && <div>时间：{currentNews.time}</div>}
                    {currentNews.type && <div>类型：{newsType[currentNews.type]}</div>}
                </div>
                <div dangerouslySetInnerHTML={{__html: currentNews.content}} />
            </div>:<>
                <h1>每日政策关注提示</h1>
                <div className="text-2xl w-full mt-4">平台：全国养老服务信息平台</div>
                <div className="text-2xl w-full mt-4">类型：政策文件</div>
                <div className="flex flex-row w-full gap-4 mt-4">
                    <div className="h-full grow-6 shrink-1 basis-[50%] overflow-y-clip">
                        <div className="my-4">可能感兴趣的内容➡️</div>
                        <img src={picture2} className="size-full nodrag" />
                    </div>
                    <div className="grow-1 shrink-1 basis-[50%]">
                        <div className="mt-2 text-2xl">养老金融</div>
                        <div className="mt-2">发展养老金融，支持养老设施建设，推广商业健康保险。</div>
                        <div className="mt-2 text-2xl">养老服务补贴</div>
                        <div className="mt-2">完善补贴政策，推进异地结算，支持普惠养老服务。</div>
                        <div className="mt-2 text-2xl">老年教育和就业</div>
                        <div className="mt-2">开展老年教育，开发适合老年人的就业岗位。</div>
                        <div className="mt-2 text-2xl">居家养老</div>
                        <div className="mt-2 text-2xl">社区养老</div>
                        <div className="mt-2 text-2xl">机构养老</div>
                        <div className="mt-2">完善家庭养老支持政策，建设家庭养老床位，提供助餐、助浴等上门服务。发展嵌入式社区养老，增加活动场所，提供日间照料和上门服务。优化机构养老，增加护理型床位，满足失能老人需求。</div>
                        <div className="mt-2 text-2xl">医养结合</div>
                        <div className="mt-2">强化医疗与养老结合，简化转诊程序，发展安宁疗护。</div>
                    </div>
                </div>
                {/*<div className="mt-8 flex flex-row justify-center gap-8 w-full">
                    <div className="flex flex-col w-64 gap-4">
                        <img src={picture1} className="w-full nodrag" />
                        <img src={picture2} className="w-full nodrag" />
                    </div>
                    <div className="flex flex-col gap-4">
                        {newsList.map(value=><div key={value.news_id} className="flex flex-row items-center gap-3">
                            <div className="shrink-0 text-sm text-neutral-500">{value.time.replace(" 00:00:00", "")}</div>
                            <div className="grow"><button className="cursor-auto text-left">{value.title}</button></div>
                        </div>)}
                    </div>
                </div>*/}
            </>
            }
        </div>
        <div className="flex flex-row justify-evenly p-4 bg-[#faf7f2]">
            <External title="全国养老服务信息平台-政策咨询" link="https://yanglao.mca.gov.cn/#/homePage" />
            <External title="中国政府网-老龄健康司" link="http://www.nhc.gov.cn/lljks/new_index.shtml" />
        </div>
    </div>);
}

function External({title, link} :{title :string; link :string}){
    return(<div className="flex flex-col">
        <div>{title}</div>
        <div><a target="_blank" className="text-blue-800 hover:text-blue-800/80 active:text-blue-700 duration-150" href={link}>{link}</a></div>
    </div>);
}