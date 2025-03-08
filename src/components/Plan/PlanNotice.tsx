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
            <li>永不共享：<strong>您的信息不会向任何第三方（包括金融机构）泄露或用于营销目的。</strong></li>
        </ul>
        <h2>3. 用户授权与权益</h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>自愿填写：您可自由选择是否填写问卷，<strong>拒绝填写不影响平台其他功能使用。</strong></li>
            <li>随时撤回：提交后如需<strong>删除数据</strong>，请联系客服（service@example.com），我们将在24小时内处理。</li>
            <li>知情权：您可通过平台“隐私政策”查看完整数据使用规则。</li>
        </ul>
        <h2>4. 风险提示</h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
            <li><strong>规划建议仅供参考</strong>：平台提供的资产配置方案基于当前市场数据与政策，不构成投资推荐。</li>
            <li>市场波动风险：养老投资可能受经济环境、政策调整等因素影响，<strong>实际收益存在不确定性</strong>。</li>
            <li>中立性原则：平台严格遵守《金融产品网络营销管理办法》，<strong>不推荐具体金融产品，仅提供类型建议</strong>。</li>
        </ul>
        <h2>5. 合规声明</h2>
        <div>本问卷及后续服务符合以下法规：</div>
        <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>《中华人民共和国个人信息保护法》</li>
            <li>《金融产品网络营销管理办法》</li>
        </ul>
        <div>等中国人民银行、银保监会养老金融相关政策</div>
        <h2>6. 免责声明</h2>
        <div>银龄财富规划平台（以下简称“本平台”）郑重声明：</div>
        <ol className="list-decimal pl-6 flex flex-col gap-2">
            <li>本问卷收集的信息及基于此生成的规划建议仅为一般性参考，不构成任何形式的财务、投资、法律或其他专业建议。用户应结合自身实际情况后独立决策。</li>
            <li>本平台不对问卷填写内容的真实性、完整性及准确性作任何明示或暗示的保证，亦不承担因用户依赖问卷结果直接或间接导致的财产损失、数据误差或其他风险责任。</li>
            <li>市场环境、政策法规及个人情况可能发生变化，本平台不保证规划建议的长期适用性，用户需定期复核并自行调整策略。</li>
            <li>本平台明确免除因技术故障、数据传输错误、不可抗力事件或第三方行为导致的责任。</li>
            <li>本声明的解释权及修订权归本平台所有，相关条款的修改将提前通过平台公告通知。</li>
        </ol>
        <div>提交即视为您已阅读并同意上述条款。</div>
        <div>如需帮助，请联系客服：service@example.com | 电话：400XXXXXXX</div>
    </div>);
}