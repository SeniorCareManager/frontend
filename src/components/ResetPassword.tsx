import { Button, Form, Input, Tooltip } from "antd";
import { MobileOutlined } from "@ant-design/icons";
import { useState } from "react";

type FieldType = {
    phone :string;
    verification :string;
};

export default function ResetPassword(){
    const [getVer, setGetVer] = useState(-1);

    return(<div className="grow flex flex-row justify-center">
        <div className="flex flex-col justify-center w-96 mb-48">
            <h1 className="text-center mb-8">重置密码</h1>
            <Form>
                <div className="text-lg mb-4">请输入注册时使用的手机号码</div>
                <Form.Item<FieldType> name="phone" required>
                    <Input size="large" prefix={<MobileOutlined className="mr-2" />} placeholder="手机号码"
                    suffix={<Button htmlType="button">
                        {getVer > 0 ? `${getVer}秒后重新获取` : "获取验证码"}
                    </Button>} />
                </Form.Item>
                <div className="text-lg mt-8 mb-4">请输入收到的验证码</div>
                <Form.Item<FieldType> name="verification" required>
                    <Tooltip title={getVer === -1 ? "请先获取验证码" : null}>
                        <Input.OTP size="large" disabled={getVer === -1} length={6} />
                    </Tooltip>
                </Form.Item>
                <Form.Item label={null}>
                    <Tooltip title={getVer === -1 ? "请先获取验证码" : null}>
                        <Button disabled={getVer === -1} className="w-full" size="large" autoInsertSpace={false} type="primary" htmlType="button">
                        验证
                        </Button>
                    </Tooltip>
                </Form.Item>
            </Form>
        </div>
    </div>);
}

function SetNewPassword(){

    return(<div>

    </div>);
}