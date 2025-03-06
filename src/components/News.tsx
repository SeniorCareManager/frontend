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
    return(<div className="grow bg-[#f5f1ef] flex flex-row p-4 gap-2">
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
                <div className="mt-8 flex flex-row justify-center gap-8 w-full">
                    <div className="flex flex-col w-64 gap-4">
                        <img src={picture1} className="w-full nodrag" />
                        <img src={picture2} className="w-full nodrag" />
                    </div>
                    <div className="flex flex-col gap-4">
                        {newsList.map(value=><div key={value.news_id} className="flex flex-row items-center gap-3">
                            <div className="shrink-0 text-sm text-neutral-500">{value.time.replace(" 00:00:00", "")}</div>
                            <div className="grow"><button className="underline underline-offset-3 text-left" onClick={()=>getNews(value.news_id)}>{value.title}</button></div>
                        </div>)}
                    </div>
                </div>
            </>
            }
        </div>
        <div className="flex flex-col p-4 border-2 border-black">
            <h1 className="mb-8">权威平台　一键跳转</h1>
            <div className="flex flex-col gap-4">
                <External title="全国养老服务信息平台-政策咨询" link="https://yanglao.mca.gov.cn/#/homePage" />
                <External title="中国老龄协会-老龄事业" link="https://www.cncaprc.gov.cn" />
                <External title="中国老龄协会-政策法规" link="https://www.cncaprc.gov.cn/zcfg/index.jhtml" />
            </div>
            <div className="mt-8 w-64"><img src={picture4} className="w-full nodrag" /></div>
        </div>
    </div>);
}

function External({title, link} :{title :string; link :string}){
    return(<div className="flex flex-col">
        <div>{title}</div>
        <div><a target="_blank" className="text-blue-800 hover:text-blue-800/80 active:text-blue-700 duration-150" href={link}>{link}</a></div>
    </div>);
}