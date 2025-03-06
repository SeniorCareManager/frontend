import { Cascader, Checkbox, CheckboxOptionType, Input, Radio, RadioChangeEvent } from "antd";
import { useContext, useState } from "react";
import divisionData from "./pca.json";
import { MessageContext } from "../App";

export function Questionnaire({advanceTo1} :{advanceTo1 :()=>void}){
    const { messageApi } = useContext(MessageContext);
    const [answers, setAnswers] = useState<Map<number, number[]>>(new Map([
        [0, [0]], [1, [0]], [2, [0]], [3, [0]], [4, [0]], [5, [0]], [6, [0]], [7, [0]], [8, [0]], [9, [0]], [10, [0]], [11, [0]], [12, [0]], [13, [0]], [14, [0]], [15, [0]]
    ]));
    const getSingleSetter = (index :number)=>(e :RadioChangeEvent)=>{
        setAnswers(_answers=>{
            const answersTemp = new Map(_answers);
            answersTemp.set(index, [e.target.value]);
            return answersTemp;
        });
    };
    const getMultiSetter = (index :number)=>(checkedValue :number[])=>{
        setAnswers(_answers=>{
            const answersTemp = new Map(_answers);
            answersTemp.set(index, checkedValue);
            return answersTemp;
        });
    };
    const [cascade, setCascade] = useState<string[]>([]);
    return(<div className="flex flex-col py-16 h-full overflow-y-auto">
        <h2>第一部分：用户基本信息</h2>
        <SingleChoice question="您的年龄范围是？" current={answers.get(0)![0]} setCurrent={getSingleSetter(0)} options={[
            {value: 1, label: "40-45岁"},
            {value: 2, label: "46-50岁"},
            {value: 3, label: "51-55岁"}
        ]} />
        <SingleChoice question="您的性别是？" current={answers.get(1)![0]} setCurrent={getSingleSetter(1)} options={[
            {value: 1, label: "男"},
            {value: 2, label: "女"}
        ]} />
        <SingleChoice question="您目前的职业状态是？" current={answers.get(2)![0]} setCurrent={getSingleSetter(2)} options={[
            {value: 1, label: "在职（企业/事业单位）"},
            {value: 2, label: "自由职业/个体经营者"},
            {value: 3, label: "退休返聘"},
            {value: 4, label: <>
                其他
                {answers.get(2)![0] === 4 && <Input size="small" placeholder="请输入…" />}
            </>}
        ]} />
        <div className="mt-8 mb-2">您所在的省份/城市是？</div>
        <Cascader options={divisionData} style={{width: 500, marginBottom: 8}} />
        <SingleChoice question="您的家庭结构是？" current={answers.get(4)![0]} setCurrent={getSingleSetter(4)} options={[
            {value: 1, label: "单身"},
            {value: 2, label: "已婚无子女"},
            {value: 3, label: <>
                已婚有子女（请输入子女年龄）
                {answers.get(4)![0] === 3 && <Input size="small" placeholder="请输入…" />}
            </>},
            {value: 4, label: "需赡养父母"}
        ]} />
        <h2 className="mt-8">第二部分：财务状况与养老储备</h2>
        <SingleChoice question="您的家庭月均收入（税后）约为？" current={answers.get(5)![0]} setCurrent={getSingleSetter(5)} options={[
            {value: 1, label: "银行存款"},
            {value: 2, label: "10,000-20,000元"},
            {value: 3, label: "20,000-50,000元"},
            {value: 4, label: "50,000元以上"}
        ]} />
        <MultiChoice question="您目前的资产配置主要包括哪些？（可多选）" current={answers.get(6)!} setCurrent={getMultiSetter(6)} options={[
            {value: 1, label: "银行存款"},
            {value: 2, label: <>
                房产（自住/投资）
                {answers.get(6)!.includes(2) && <Input size="small" placeholder="请输入…" />}
            </>},
            {value: 3, label: "股票/基金"},
            {value: 4, label: "商业养老保险"},
            {value: 5, label: "养老理财产品（如目标日期基金、养老储蓄存款）"},
            {value: 6, label: <>
                其他
                {answers.get(6)!.includes(6) && <Input size="small" placeholder="请输入…" />}
            </>}
        ]} />
        <MultiChoice question="您当前的负债情况是？（可多选）" current={answers.get(7)!} setCurrent={getMultiSetter(7)} options={[
            {value: 1, label: "无负债"},
            {value: 2, label: <>
                房贷（剩余年限）
                {answers.get(7)!.includes(2) && <Input size="small" placeholder="请输入…" />}
            </>},
            {value: 3, label: <>
                车贷（剩余年限）
                {answers.get(7)!.includes(3) && <Input size="small" placeholder="请输入…" />}
            </>},
            {value: 4, label: "消费贷款"},
            {value: 5, label: "信用卡分期还款"},
            {value: 6, label: <>
                其他
                {answers.get(7)!.includes(6) && <Input size="small" placeholder="请输入…" />}
            </>}
        ]} />
        <SingleChoice question="您已为养老准备的资金规模约为？" current={answers.get(8)![0]} setCurrent={getSingleSetter(8)} options={[
            {value: 1, label: "未开始准备"},
            {value: 2, label: "10万元以下"},
            {value: 3, label: "10-50万元"},
            {value: 4, label: "50-100万元"},
            {value: 5, label: "100万元以上"}
        ]} />
        <h2 className="mt-8">第三部分：养老需求与目标</h2>
        <SingleChoice question="您预期的退休年龄是？" current={answers.get(9)![0]} setCurrent={getSingleSetter(9)} options={[
            {value: 1, label: "50-55岁"},
            {value: 2, label: "56-60岁"},
            {value: 3, label: "61岁及以上"}
        ]} />
        <SingleChoice question="您期望退休后的月均生活支出约为当前收入的多少比例？" current={answers.get(10)![0]} setCurrent={getSingleSetter(10)} options={[
            {value: 1, label: "40%-60%（基础保障型）"},
            {value: 2, label: "60%-80%（舒适生活型）"},
            {value: 3, label: "80%-100%（品质提升型）"}
        ]} />
        <MultiChoice question="您最关注的养老需求是？（可多选）" current={answers.get(11)!} setCurrent={getMultiSetter(11)} options={[
            {value: 1, label: "日常基本生活保障"},
            {value: 2, label: "医疗及长期护理费用"},
            {value: 3, label: "休闲娱乐（旅游、兴趣活动）"},
            {value: 4, label: "财富传承（如子女教育、资产继承）"},
            {value: 5, label: <>
                其他
                {answers.get(11)!.includes(5) && <Input size="small" placeholder="请输入…" />}
            </>}
        ]} />
        <MultiChoice question="您是否已配置以下保障？（可多选）" current={answers.get(12)!} setCurrent={getMultiSetter(12)} options={[
            {value: 1, label: "基本医疗保险"},
            {value: 2, label: "商业重疾险"},
            {value: 3, label: "长期护理保险"},
            {value: 4, label: "无"}
        ]} />
        <h2 className="mt-8">第四部分：风险偏好与投资行为</h2>
        <SingleChoice question="您能接受的养老投资波动范围是？" current={answers.get(13)![0]} setCurrent={getSingleSetter(13)} options={[
            {value: 1, label: "本金安全，收益稳定（如存款、国债）"},
            {value: 2, label: "小幅波动，追求稳健增值（如债券型基金）"},
            {value: 3, label: "中等波动，追求较高收益（如混合型基金）"},
            {value: 4, label: "高风险高收益（如股票、权益类产品）"}
        ]} />
        <SingleChoice question="以下哪种情景更符合您的投资态度？" current={answers.get(14)![0]} setCurrent={getSingleSetter(14)} options={[
            {value: 1, label: "宁愿收益低，也要确保本金安全"},
            {value: 2, label: "接受短期波动，追求长期稳健增长"},
            {value: 3, label: "愿意承担较高风险以获取超额收益"}
        ]} />
        <h2 className="mt-8">第五部分：政策与信息获取</h2>
        <SingleChoice question="您是否已参与个人养老金制度并享受税收优惠？" current={answers.get(15)![0]} setCurrent={getSingleSetter(15)} options={[
            {value: 1, label: "是，已参与"},
            {value: 2, label: "是，但未参与"},
            {value: 3, label: "不了解该政策"}
        ]} />
        <MultiChoice question="您希望通过哪些渠道获取养老政策信息？（可多选）" current={answers.get(16)!} setCurrent={getMultiSetter(16)} options={[
            {value: 1, label: "政府官网/社保平台"},
            {value: 2, label: "金融机构推送（如银行、保险公司）"},
            {value: 3, label: "社交媒体（微信、抖音等）"},
            {value: 4, label: "线下讲座/社区活动"},
            {value: 5, label: "本平台政策解读专栏"}
        ]} />
        <h2 className="my-8">合规性说明</h2>
        <ol className="list-decimal pl-6">
            <li>隐私保护：您的信息仅用于生成个性化养老规划建议，平台将严格遵守《个人信息保护法》，不会向第三方共享数据。</li>
            <li>数据安全：所有信息通过SSL加密传输，存储于安全服务器，访问权限严格分级。</li>
            <li>用户授权：提交即视为同意《隐私政策》。</li>
            <li>风险提示：养老投资存在市场波动风险，建议根据自身情况审慎决策。</li>
        </ol>
        <div>提交问卷即视为您已阅读并同意上述条款。感谢您的信任与支持！</div>
        <div className="mt-8 flex flex-row justify-center">
            <button className="w-48 cursor-pointer px-8 py-6 mb-4 rounded-3xl text-lg duration-150 bg-yellow-200 hover:bg-yellow-300/70 active:bg-yellow-200/80" onClick={()=>{
                messageApi!.success("问卷提交成功");
                advanceTo1();
            }}>提交问卷</button>
        </div>
    </div>);
}

function SingleChoice({question, options, current, setCurrent} :{question :string; options :CheckboxOptionType<any>[], current :number, setCurrent :(e :RadioChangeEvent)=>void}){
    return(<div className="flex flex-col w-full">
        <div className="mt-8 mb-2">{question}</div>
        <Radio.Group
            className="!flex !flex-col"
            onChange={setCurrent}
            value={current}
            options={options.map(value=>({...value, style: {marginBottom: 6}}))}
        />
    </div>);
}

function MultiChoice({question, options, current, setCurrent} :{question :string; options :CheckboxOptionType<any>[], current :number[], setCurrent :(checkedValue :number[])=>void}){
    return(<div className="flex flex-col w-full">
        <div className="mt-8 mb-2">{question}</div>
        <Checkbox.Group
            className="!flex !flex-col"
            onChange={setCurrent}
            value={current}
            options={options.map(value=>({...value, style: {marginBottom: 6}}))}
        />
    </div>);
}