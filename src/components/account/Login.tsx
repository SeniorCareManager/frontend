import { useContext, useEffect, useRef, useState } from "react";
import { LoginForm, ProFormCheckbox, ProFormInstance, ProFormText } from "@ant-design/pro-components";
import { LockOutlined, MobileOutlined } from "@ant-design/icons";
import { ConfigProvider, Modal } from "antd";
import localforage from "localforage";
import { login, LoginFormData, LoginResponse } from "../../schema/login";
import { LoginStatusContext, MessageContext, routes } from "../App";
import { Link, useNavigate } from "react-router";
import Terms from "../Terms";

/**@once */
export default function Login(){
    const nav = useNavigate();
    const { messageApi } = useContext(MessageContext);
    const ref = useRef<ProFormInstance<LoginFormData> | undefined>(null);
    //1. 初始化中  2. 登录请求中
    const [loading, setLoading] = useState(false);
    const { loggedIn, setLogin, accessToken } = useContext(LoginStatusContext);
    const finish = (values :LoginFormData)=>{
        if(!values.agree){
            messageApi!.error("请阅读并同意用户协议！");
            return;
        }
        setLoading(true);
        login(values.phone, values.password)
        .then(async (value :Response)=>{
            if(value){
                const response :LoginResponse = await value.json();
                if(response.success){
                    messageApi!.success(response.message);
                    setLogin(true, response.access_token);
                    if(values.remember){
                        localforage.setItem("phone", values.phone);
                        localforage.setItem("password", values.password);
                    }
                    else{
                        localforage.removeItem("phone");
                        localforage.removeItem("password");
                    }
                    nav(routes.profile);
                }
                else messageApi!.error(response.message);
            }
            else messageApi!.error("登录请求失败，请刷新重试");
        }).catch(e=>messageApi!.error("登录请求失败，请刷新重试")).finally(()=>setLoading(false));
    };
    const [termModalOpen, setTermModalOpen] = useState(false);
    useEffect(()=>{(async()=>{
        const
            phone = await localforage.getItem<string>("phone"),
            password = await localforage.getItem<string>("password");
        if(phone && password){
            ref.current?.setFieldValue("phone", phone);
            ref.current?.setFieldValue("password", password);
            ref.current?.setFieldValue("remember", true);
        }
    })()});
    return(<>
        <Modal width={900} centered closable={false} okText="同意" cancelText="不同意" onCancel={()=>setTermModalOpen(false)} okButtonProps={{autoInsertSpace: false}} open={termModalOpen}
        classNames={{
            content: "h-192 overflow-y-auto",
            mask: "backdrop-blur-sm"
        }}
        footer={null}><Terms /></Modal>
        <ConfigProvider theme={{token: {fontSize: 14}}}><div className="flex grow flex-row justify-around">
            <div>左主图</div>
            <div className="flex flex-col justify-center"><div className="pb-32"><LoginForm
                formRef={ref} onFinish={finish}
                title={<h1>用户登录</h1>}
                submitter={{submitButtonProps: {loading: loading, autoInsertSpace: false}}}
            >
                <div className="size-full mb-8"></div>
                <ProFormText validateTrigger="onBlur" placeholder="手机号" name="phone"
                rules={[
                    {
                        required: true,
                        message: "请输入手机号！",
                    },
                    {
                        pattern: /^1\d{10}$/,
                        message: "手机号格式错误！"
                    }
                ]}
                fieldProps={{
                    size: "large",
                    prefix: <MobileOutlined className="mr-1" />
                }} />
                <div className="size-full mb-8"></div>
                <ProFormText.Password validateTrigger="onBlur" rules={[{required: true, message: "请输入密码！"}]} name="password" placeholder="密码" fieldProps={{
                    size: "large",
                    prefix: <LockOutlined className="mr-1" />
                }} />
                <div className="flex flex-row gap-12 mb-1 select-none">
                    <ProFormCheckbox name="remember" valuePropName="checked">记住密码</ProFormCheckbox>
                    <ProFormCheckbox name="agree">我已阅读并同意 <span className="text-blue-500" onClick={()=>setTermModalOpen(true)}>用户协议</span></ProFormCheckbox>
                </div>
                <div className="flex flex-row justify-between mb-2">
                    <Link to={routes.reset} style={{color: "black"}}>忘记密码？</Link>
                    <div>还没有账号？<Link to={routes.register} className="text-blue-500">立即注册</Link></div>
                </div>
            </LoginForm></div></div>
        </div></ConfigProvider>
    </>);
}