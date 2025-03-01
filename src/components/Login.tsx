import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { LoginForm, ProFormCheckbox, ProFormInstance, ProFormText } from "@ant-design/pro-components";
import { LockOutlined, MobileOutlined } from "@ant-design/icons";
import { ConfigProvider, Modal } from "antd";
import localforage from "localforage";
import { login, LoginFormData, LoginResponse } from "../schema/login";
import { MessageContext, routes } from "./App";
import { useNavigate } from "react-router";
import 合规声明 from "./合规声明";

type Props = {
    //succeedCallBack :(responseData :LoginResponse)=>void;
};

/**@once */
export default function Login(props :Props){
    const
        nav = useNavigate(),
        {messageApi} = useContext(MessageContext),
        ref = useRef<ProFormInstance<LoginFormData> | undefined>(null),
        [loading, setLoading] = useState(false),
        finish = (values :LoginFormData)=>{
            setLoading(true);
            login(values.username, values.password).catch((reason :any)=>{
                messageApi!.open({
                    type: "error",
                    content: "请求失败"
                });
                setLoading(false);
            }).then(async (value :Response | void)=>{
                if(value){
                    const response :LoginResponse = await value.json();
                    if(response.success){
                        //props.succeedCallBack(response);
                        if(values.remember){
                            localforage.setItem("username", values.username);
                            localforage.setItem("password", values.password);
                        }
                        else{
                            localforage.removeItem("username");
                            localforage.removeItem("password");
                        }
                    }
                    else messageApi!.open({
                        type: "error",
                        content: response.message
                    });
                }
                setLoading(false);
            });
        };
    const [open, setOpen] = useState(false);
    const [copen, setCOPen] = useState(false);
    const agreecb = useCallback(()=>{
        setCOPen(true);
    }, []);
    const denycb = useCallback(()=>{
        setOpen(false);
        messageApi!.error("您已拒绝合规声明与隐私条款", 5);
    }, []);
    const denycb2 = useCallback(()=>{
        setCOPen(false);
    }, []);
    const agreecb2 = useCallback(()=>{
        setCOPen(false);
        setOpen(false);
        messageApi!.success("您已接受合规声明与隐私条款");
    }, []);
    useEffect(()=>{
        (async ()=>{
            const
                username = await localforage.getItem<string>("username"),
                password = await localforage.getItem<string>("password");
            if(username && password){
                ref.current?.setFieldValue("username", username);
                ref.current?.setFieldValue("password", password);
                ref.current?.setFieldValue("remember", true);
            }
        })();
    });
    return(<>
        <Modal open={copen} width={300} centered closeIcon={null} okText="确认" cancelText="取消" onOk={agreecb2} onCancel={denycb2} okButtonProps={{autoInsertSpace: false}} cancelButtonProps={{autoInsertSpace: false}}
        footer={(_: React.ReactNode, {OkBtn, CancelBtn})=>{
            return(<div className="flex flex-col items-center gap-2">
                <div className="flex flex-row justify-center gap-4">
                    <OkBtn />
                    <CancelBtn />
                </div>
            </div>);
        }}><div className="text-center">您已确认隐私条款，是否继续？</div></Modal>
        <Modal width={900} closable={false} maskClosable={false} okText="同意" cancelText="不同意" onOk={agreecb} onCancel={denycb} okButtonProps={{autoInsertSpace: false}} open={open}
        classNames={{
            content: "h-192 overflow-y-auto scrollbar666",
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
        }}><合规声明 /></Modal>
        <ConfigProvider theme={{token: {fontSize: 14}}}><div className="flex grow flex-row justify-around">
            <div>左主图</div>
            <div className="flex flex-col justify-center"><div className="pb-32"><LoginForm
                formRef={ref} onFinish={finish}
                title={<h1>用户登录</h1>}
                submitter={{
                    submitButtonProps: {
                        loading
                    }
                }}
            >
                <div className="size-full mb-8"></div>
                <ProFormText placeholder={'手机号'}
                rules={[
                    {
                      required: true,
                      message: '请输入手机号！',
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '手机号格式错误！'
                    }
                ]}
                name="username" fieldProps={{
                    size: "large",
                    prefix: <MobileOutlined />
                }} />
                <div className="size-full mb-8"></div>
                <ProFormText.Password rules={[{required: true, message: "请输入密码！"}]} name="password" placeholder="密码" fieldProps={{
                    size: "large",
                    prefix: <LockOutlined />
                }} />
                <div className="flex flex-row gap-12 mb-1 select-none">
                    <ProFormCheckbox name="remember" valuePropName="checked">记住密码</ProFormCheckbox>
                    <ProFormCheckbox name="agree" valuePropName="checked">我已阅读并同意 <button type="button" onClick={()=>{setOpen(true)}}>用户协议</button></ProFormCheckbox>
                </div>
                <div className="flex flex-row justify-between mb-2">
                    <button type="button" onClick={()=>{nav(routes.reset)}}>忘记密码？</button>
                    <div>还没有账号？<button type="button" className="text-blue-500" onClick={()=>{nav(routes.register)}}>立即注册</button></div>
                </div>
            </LoginForm></div></div>
        </div></ConfigProvider>
    </>);
}