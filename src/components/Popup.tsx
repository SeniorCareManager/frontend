import { message, Modal } from "antd"
import { useCallback, useState } from "react";

export default function Popup(){
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [copen, setCOPen] = useState(false);
    const agreecb = useCallback(()=>{
        setCOPen(true);
    }, []);
    const denycb = useCallback(()=>{
        setOpen(false);
        messageApi.error("您已拒绝合规声明与隐私条款", 5);
    }, []);
    const denycb2 = useCallback(()=>{
        setCOPen(false);
    }, []);
    const agreecb2 = useCallback(()=>{
        setCOPen(false);
        setOpen(false);
        messageApi.success("您已接受合规声明与隐私条款");
    }, []);
    return(<>
        {contextHolder}
        <button onClick={()=>setOpen(true)}>打开协议</button>
        <Modal open={copen} width={300} centered closeIcon={null} okText="确认" cancelText="取消" onOk={agreecb2} onCancel={denycb2} okButtonProps={{autoInsertSpace: false}} cancelButtonProps={{autoInsertSpace: false}}
        footer={(_: React.ReactNode, {OkBtn, CancelBtn})=>{
            return(<div className="flex flex-col items-center gap-2">
                <div className="flex flex-row justify-center gap-4">
                    <OkBtn />
                    <CancelBtn />
                </div>
            </div>);
        }}>
            <div className="text-center">您已确认隐私条款，是否继续？</div>
        </Modal>
        <Modal classNames={{
            content: "h-192 overflow-y-auto scrollbar666",
            mask: "backdrop-blur-sm"
        }} width={900} closable={false} maskClosable={false} okText="同意" cancelText="不同意"
        footer={(_: React.ReactNode, {OkBtn, CancelBtn})=>{
            return(<div className="flex flex-col items-center gap-2">
                <div className="text-sm text-neutral-600">点击“同意”即视为接受本声明全部内容，并承诺遵守平台规则及法律法规。</div>
                <div className="flex flex-row justify-center gap-4">
                    <OkBtn />
                    <CancelBtn />
                </div>
            </div>);
        }}
        onOk={agreecb}
        onCancel={denycb}
        okButtonProps={{autoInsertSpace: false}} open={open}>
            <div className="p-4">
                <h1 className="mb-4">合规声明</h1>
                <ol className="pl-4 *:py-2">
                    <li>
                        <div>服务性质</div>
                        <div>本平台（"银龄财富规划平台"）提供的养老规划建议为策略性指导，非投资推荐。请根据自身财务状况、风险承受能力及政策变化独立决策，平台不对投资结果承担责任。</div>
                    </li>
                    <li>
                        <div>合规依据</div>
                        <div>本平台严格遵守国家网络安全、个人信息保护相关法律，并符合金融监管部门对养老服务的专项要求（如资管新规、养老服务发展通知等）。</div>
                    </li>
                    <li>
                        <div className="">风险提示</div>
                        <ul>
                            <li>市场波动可能导致短期亏损（如🌊潮水波动风险），建议长期稳健配置。</li>
                            <li>风险等级提示：⚠️低风险（保守型配置）、⚠️⚠️中风险（平衡型配置）、⚠️⚠️⚠️高风险（进取型配置）。</li>
                            <li>建议定期复核方案并咨询顾问。</li>
                        </ul>
                    </li>
                    <li>
                        <div>法律小贴士</div>
                        <div>您的信息受法律保护，平台未经您同意绝不共享数据。</div>
                        <div>若发现异常操作，可立即通过客服浮窗举报。</div>
                    </li>
                </ol>
                <h1 className="my-4">隐私保护协议</h1>
                <div>您的信息安全对我们至关重要！</div>
                <ol className="pl-4 *:py-2">
                    <li>
                        <div>数据用途</div>
                        <div>您的年龄、收入等信息仅用于定制养老计划，绝不用于广告或其他用途。</div>
                        <div>数据遵循"最小必要"原则，不超范围收集。</div>
                    </li>
                    <li>
                        <div>安全措施</div>
                        <div>您的信息通过加密技术保护，如同保险柜一样安全。</div>
                        <div>定期安全审计，严格限制内部访问权限。</div>
                    </li>
                    <li>
                        <div>用户权利</div>
                        <div>一键操作：支持在"个人中心"随时修改、导出或删除数据（含15秒极速注销）。</div>
                        <div>拒绝推荐：可关闭政策/活动推送。</div>
                    </li>
                    <li>
                        <div>第三方共享</div>
                        <div>与第三方合作，仅提供脱敏分析结果，不涉及具体身份信息。</div>
                    </li>
                    <li>
                        <div>数据保留</div>
                        <div>账户注销后，数据6个月自动清除（法律特殊要求除外）。</div>
                    </li>
                </ol>
            </div>
        </Modal>
    </>);
}