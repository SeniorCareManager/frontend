import { useContext, useEffect, useRef, useState } from "react";
import { LoginForm, ProFormCheckbox, ProFormInstance, ProFormText } from "@ant-design/pro-components";
import { LockOutlined, MobileOutlined } from "@ant-design/icons";
import { ConfigProvider } from "antd";
import localforage from "localforage";
import { login, LoginFormData, LoginResponse } from "../schema/login";
import { MessageContext, routes } from "./App";
import { useNavigate } from "react-router";

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
    return(<ConfigProvider theme={{token: {fontSize: 14}}}>
        <div className="flex grow flex-row justify-evenly">
            <div>asd</div>
            <LoginForm
                size="small"
                formRef={ref} onFinish={finish}
                title={<h2>用户登录</h2>}
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
                    <ProFormCheckbox name="agree" valuePropName="checked">我已阅读并同意 用户协议</ProFormCheckbox>
                </div>
                <div className="flex flex-row justify-between mb-2">
                    <button className="cursor-pointer" onClick={()=>{nav(routes.reset)}}>忘记密码？</button>
                    <div>还没有账号？<button className="cursor-pointer text-blue-500" onClick={()=>{nav(routes.register)}}>立即注册</button></div>
                </div>
            </LoginForm>
        </div>
    </ConfigProvider>);
}