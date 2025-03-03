import { Input, Radio, RadioChangeEvent } from "antd";
import { useCallback, useState } from "react";


export function Questionnaire(){
    return(<div className="flex flex-col py-16 h-full overflow-y-auto">
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
        <SingleChoice question="666?" options={["第一", "二rqwr", "三fewipujhq", "四fewfujhiowefjopewwwer"]} />
    </div>);
}

function SingleChoice({question, options} :{question :string; options :[string, string, string, string]}){
    const [current, setCurrent] = useState(1);
    const onChange = useCallback((e: RadioChangeEvent)=>{
        setCurrent(e.target.value);
    }, []);
    return(<div className="flex flex-col w-full">
        <div className="mt-8 mb-2">{question}</div>
        <Radio.Group
            className="!flex !flex-col"
            onChange={onChange}
            value={current}
            options={[
                {value: 1, label: "Option A", style: {marginBottom: 6}},
                {value: 2, label: "Option B", style: {marginBottom: 6}},
                {value: 3, label: "Option C", style: {marginBottom: 6}},
                {value: 4, label: "Option D", style: {marginBottom: 6}}
            ]}
        />
    </div>);
}