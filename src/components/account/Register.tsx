import { Button, Checkbox, ConfigProvider, Form, Input, Modal } from "antd";
import { KeyOutlined, LockOutlined, MobileOutlined } from "@ant-design/icons";
import { LoginStatusContext, MessageContext, routes } from "../App";
import { Link, useNavigate } from "react-router";
import { useCallback, useContext, useEffect, useState } from "react";
import Terms from "../Terms";
import meta from "../../meta";
import { useForm } from "antd/es/form/Form";
import { GetVerResponse, RegisterResponse } from "../../schema/register";
import background from "../../assets/user_bg.png";

type RegisterFormData = {
    phone :string;
    code :string;
    password :string;
    repeatPassword :string;
    agree :"on" | undefined;
};

export default function Register(){
    const nav = useNavigate();
    const { messageApi } = useContext(MessageContext);
    const [form] = useForm<RegisterFormData>();
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [termModalOpen, setTermModalOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [verSignal, setVerSignal] = useState(0);
    const [getVer, setGetVer] = useState(0);
    const { setLogin } = useContext(LoginStatusContext);
    useEffect(()=>{
        const id = setInterval(()=>{
            setGetVer(prevGetVer=>{
                if(prevGetVer > 0) return --prevGetVer;
                else{
                    clearInterval(id);
                    return 0;
                }
            });
        }, 1000);
        return ()=>clearInterval(id);
    }, [verSignal]);
    const agreecb = useCallback(()=>setConfirmOpen(true), []);
    const denycb = useCallback(()=>setTermModalOpen(false), []);
    const denycb2 = useCallback(()=>setConfirmOpen(false), []);
    const agreecb2 = useCallback(()=>{
        setConfirmOpen(false);
        setTermModalOpen(false);
        setAgreedToTerms(true);
        messageApi!.success("您已接受合规声明与隐私条款");
    }, []);
    const getCode = useCallback(async ()=>{
        form.validateFields(["phone"]).then(async ()=>{
            const phone = form.getFieldValue("phone");
            if(phone && /^1\d{10}$/.test(phone)){
                const request = fetch(`${meta.apiDomain}/v1/user/register`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({phone})
                });
                request.catch((e :any)=>messageApi!.error(JSON.stringify(e)));
                const data :GetVerResponse = await (await request).json();
                if(!data.success){
                    if(data.status === "用户已注册"){
                        messageApi!.error("本手机号已注册，请登录");
                        nav(routes.login);
                    }
                    else messageApi!.error(data.status);
                }
                else{
                    messageApi!.success(data.status);
                    setGetVer(60);
                    setVerSignal(verSignal=>++verSignal);
                }
            }
        }).catch(()=>{});
    }, []);
    const finish = useCallback(async (values :RegisterFormData)=>{
        //console.log(values);
        if(!agreedToTerms){
            messageApi!.error("请阅读并同意用户协议！");
            return;
        }
        const request = fetch(`${meta.apiDomain}/v1/user/verify`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                phone: form.getFieldValue("phone"),
                password: form.getFieldValue("password"),
                code: form.getFieldValue("code")
            })
        });
        request.catch((e :any)=>messageApi!.error(JSON.stringify(e)));
        const data :RegisterResponse = await (await request).json();
        if(!data.success) messageApi!.error(data.status);
        else{
            messageApi!.success(data.status);
            setLogin(true, data.access_token);
            nav(routes.profile);
        }
    }, [agreedToTerms]);
    return(<>
        <Modal open={confirmOpen} width={300} centered closeIcon={null} okText="确认" cancelText="取消" onOk={agreecb2} onCancel={denycb2} okButtonProps={{autoInsertSpace: false}} cancelButtonProps={{autoInsertSpace: false}}
        footer={(_: React.ReactNode, {OkBtn, CancelBtn})=>{
            return(<div className="flex flex-col items-center gap-2">
                <div className="flex flex-row justify-center gap-4">
                    <OkBtn />
                    <CancelBtn />
                </div>
            </div>);
        }}><div className="text-center">您已确认隐私条款，是否继续？</div></Modal>
        <Modal width={900} centered closable={false} maskClosable={false} okText="同意" cancelText="不同意" onOk={agreecb} onCancel={denycb} okButtonProps={{autoInsertSpace: false}} open={termModalOpen}
        classNames={{
            content: "h-192 overflow-y-auto",
            mask: "backdrop-blur-sm"
        }}
        footer={(_: React.ReactNode, {OkBtn, CancelBtn})=>{
            return(<div className="flex flex-col items-center gap-2">
                <div className="text-sm text-neutral-600">点击“同意”即视为接受本声明全部内容，并承诺遵守平台规则及法律法规。</div>
                <div className="flex flex-row justify-center gap-4">
                    <OkBtn />
                    <CancelBtn />
                </div>
            </div>);
        }}><Terms /></Modal>
        <ConfigProvider theme={{token: {
            fontSize: 14,
            colorBorder: "#a29881",
            colorBgBase: "#e0b557"
        }}}><div className="flex grow flex-row justify-around" style={{
            backgroundSize: "100%",
            backgroundPosition: "left top",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${background})`
        }}>
            <div></div>
            <div className="flex flex-col justify-center"><div className="pb-32"><Form<RegisterFormData> form={form} onFinish={finish}>
                <h1>欢迎加入银龄财富规划</h1>
                <div className="size-full mb-8"></div>
                <Form.Item<RegisterFormData> name="phone" validateTrigger="onBlur" rules={[
                    {
                        required: true,
                        message: "请输入手机号！",
                    },
                    {
                        pattern: /^1\d{10}$/,
                        message: "手机号格式错误！"
                    }
                ]}>
                    <div className="flex flex-row items-center gap-3">
                        <Input size="large" placeholder="手机号" prefix={<MobileOutlined className="mr-1" />} />
                        <Button htmlType="button" disabled={getVer > 0} size="large" onClick={getCode}>{getVer > 0 ? `${getVer}秒后重新获取` : "获取验证码"}</Button>
                    </div>
                </Form.Item>
                <Form.Item<RegisterFormData> name="password" validateTrigger="onBlur" rules={[{required: true, message: "请输入密码！"}]}>
                    <Input.Password size="large" placeholder="密码" prefix={<LockOutlined className="mr-1" />} />
                </Form.Item>
                <Form.Item<RegisterFormData> name="repeatPassword" validateTrigger="onBlur" dependencies={["password"]} rules={[
                    {required: true, message: "请再次输入密码！"},
                    ({getFieldValue})=>({
                        validator: (_, value)=>!value || getFieldValue('password') === value ? Promise.resolve() : Promise.reject(new Error("两次输入的密码不匹配！"))
                    })
                ]}>
                    <Input.Password size="large" placeholder="再次输入密码" prefix={<LockOutlined className="mr-1" />} />
                </Form.Item>
                <Form.Item<RegisterFormData> name="code" validateTrigger="onBlur" rules={[
                    {
                        required: true,
                        message: "请输入短信验证码！"
                    },
                    {
                        pattern: /^\d*$/,
                        message: "验证码格式错误，请检查！"
                    }
                ]} required>
                    <Input size="large" placeholder="短信验证码" maxLength={6} prefix={<KeyOutlined className="mr-1" />} />
                </Form.Item>
                <Form.Item<RegisterFormData> name="agree" className="m-0">
                    <button type="button" onClick={()=>{agreedToTerms ? setAgreedToTerms(false) : setTermModalOpen(true)}}><Checkbox tabIndex={-1} checked={agreedToTerms} onChange={event=>event.target.checked ? setTermModalOpen(true) : setAgreedToTerms(false)}>
                        我已阅读并同意 <span className="text-blue-500">用户协议</span>
                    </Checkbox></button>
                </Form.Item>
                <div className="mb-2">已有账号？<Link to={routes.login} className="text-blue-500">登录</Link></div>
                <Button htmlType="submit" type="primary" className="w-full !bg-[#e49939] hover:!bg-[#f79513] active:!bg-[#e3ad4b] !text-black" size="large">注册账户</Button>
            </Form></div></div>
        </div></ConfigProvider>
    </>);
}