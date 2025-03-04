export default function PlanNotice(){
    return(<div className="my-8 text-lg flex flex-col px-32 *:mb-2 overflow-y-auto">
        <div className="flex flex-col items-center">
            <h1 className="mb-2">银龄财富规划平台·问卷填写用户须知</h1>
            <div className="text-sm mb-6">填写前请仔细阅读并确认</div>
        </div>
        <h2>1. 数据收集目的</h2>
        <div>本问卷旨在全面了解您的财务状况、养老需求及风险偏好，以便为您生成个性化养老规划建议。您的回答将作为平台提供定制化服务的核心依据。</div>
        <h2>2. 隐私保护承诺</h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>数据加密传输：所有信息通过SSL加密技术传输，确保安全性。</li>
            <li>严格权限管理：仅授权人员可访问您的数据，且仅用于生成规划方案。</li>
            <li>匿名化处理：分析过程中将对敏感信息（如姓名、联系方式）进行脱敏处理。</li>
            <li>永不共享：您的信息不会向任何第三方（包括金融机构）泄露或用于营销目的。</li>
        </ul>
        <h2>3. 用户授权与权益</h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>自愿填写：您可自由选择是否填写问卷，拒绝填写不影响平台其他功能使用。</li>
            <li>随时撤回：提交后如需删除数据，请联系客服（service@example.com），我们将在24小时内处理。</li>
            <li>知情权：您可通过平台“隐私政策”查看完整数据使用规则。</li>
        </ul>
        <h2>4. 风险提示</h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>规划建议仅供参考：平台提供的资产配置方案基于当前市场数据与政策，不构成投资推荐。</li>
            <li>市场波动风险：养老投资可能受经济环境、政策调整等因素影响，实际收益存在不确定性。</li>
            <li>中立性原则：平台严格遵守《金融产品网络营销管理办法》，不推荐具体金融产品，仅提供类型建议。</li>
        </ul>
        <h2>5. 合规声明</h2>
        <div>本问卷及后续服务符合以下法规：</div>
        <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>《中华人民共和国个人信息保护法》</li>
            <li>《金融产品网络营销管理办法》</li>
            <li>中国人民银行、银保监会养老金融相关政策</li>
        </ul>
        <div>提交即视为您已阅读并同意上述条款。</div>
        <div>如需帮助，请联系客服：service@example.com | 电话：400XXXXXXX</div>
    </div>);
}