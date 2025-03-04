

export default function News(){
    return(<div className="grow bg-[#f5f1ef] flex flex-row p-4 gap-2">
        <div className="grow flex flex-col p-4 items-center border-2 border-black">
            <h1>每日政策关注提示</h1>
            <div>

            </div>
        </div>
        <div className="flex flex-col p-4 border-2 border-black">
            <h1 className="mb-8">权威平台　一键跳转</h1>
            <div className="flex flex-col gap-4">
                <External title="全国养老服务信息平台-政策咨询" link="https://yanglao.mca.gov.cn/#/homePage" />
                <External title="中国老龄协会-老龄事业" link="https://www.cncaprc.gov.cn" />
                <External title="中国老龄协会-政策法规" link="https://www.cncaprc.gov.cn/zcfg/index.jhtml" />
            </div>
        </div>
    </div>);
}

function External({title, link} :{title :string; link :string}){
    return(<div className="flex flex-col">
        <div>{title}</div>
        <div><a target="_blank" className="text-blue-800 hover:text-blue-800/80 active:text-blue-700 duration-150" href={link}>{link}</a></div>
    </div>);
}