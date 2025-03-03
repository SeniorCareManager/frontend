import { Button, Form, Input, Tooltip } from "antd";
import { MobileOutlined } from "@ant-design/icons";
import { useState } from "react";
import background from "../../assets/general3.png";

type FieldType = {
    phone :string;
    code :string;
};

export default function ResetPassword(){
    const [getVer, setGetVer] = useState(-1);
    return(<div className="grow flex flex-row justify-center" style={{
        backgroundSize: "100% 100%",
        backgroundPosition: "left top",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${background})`
    }}>
        <div className="flex flex-col justify-center w-96 mb-48">
            <h1 className="text-center mb-8">重置密码</h1>
            <Form>
                <div className="text-lg mb-4">请输入注册时使用的手机号码</div>
                <Form.Item<FieldType> name="phone" required>
                    <div className="flex flex-row items-center gap-3">
                        <Input size="large" prefix={<MobileOutlined className="mr-1" />} placeholder="手机号" />
                        <Button htmlType="button" size="large">{getVer > 0 ? `${getVer}秒后重新获取` : "获取验证码"}</Button>
                    </div>
                </Form.Item>
                <div className="text-lg mt-8 mb-4">请输入收到的验证码</div>
                <Tooltip title={getVer === -1 ? "请先获取验证码" : null}>
                    <Form.Item<FieldType> name="code" rules={[
                        {
                            required: true,
                            message: "请输入短信中的验证码！"
                        },
                        {
                            type: "number",
                            message: "验证码格式错误，请检查！"
                        }
                    ]} required>
                        <Input.OTP size="large" disabled={getVer === -1} length={6} separator={i=>i === 2 ? "-" : ""} />
                    </Form.Item>
                </Tooltip>
                <Tooltip title={getVer === -1 ? "请先获取验证码" : null}>
                    <Form.Item label={null}>
                        <Button disabled={getVer === -1} className="w-full" size="large" autoInsertSpace={false} type="primary" htmlType="submit">验证</Button>
                    </Form.Item>
                </Tooltip>
            </Form>
        </div>
    </div>);
}

function SetNewPassword(){
    return(<div>

    </div>);
}