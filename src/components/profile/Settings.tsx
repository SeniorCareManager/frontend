import { Button, GetProp, Input, Modal, Switch, Upload } from "antd";
import { UserData } from "../../schema/user";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import { LoginStatusContext, MessageContext, routes } from "../App";
import meta from "../../meta";
import { useNavigate } from "react-router";

export default function Settings({ user } :{user :UserData}){
    const { messageApi } = useContext(MessageContext);
    const nav = useNavigate();
    const { accessToken, initialzing, setLogin } = useContext(LoginStatusContext);
    const [avatarFile, setAvatarFile] = useState<UploadFile | null>(null);
    useEffect(()=>{(async()=>{
        if(avatarFile){
            const formData = new FormData();
            formData.append("file", avatarFile as RcFile);
            const response = fetch(`${meta.apiDomain}/v1/user/avatar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: formData
            });
            response.catch(e=>console.log(e));
            const data = await (await response).json();
            console.log(data);
        }
    })()}, [avatarFile]);
    const beforeAvatarCCB = useCallback((file :RcFile)=>{
        if(file.type !== "image/jpeg" && file.type !== "image/png"){
            messageApi!.error("只能上传JPG或PNG格式的图片！");
            return false;
        }
        if(file.size > 1024 * 1024 * 2){
            messageApi!.error("图片大小不能大于2MB！");
            return false;
        }
        setAvatarFile(file);
        return false;
    }, []);
    const [avatarU, setAvatarU] = useState(false);
    const avatarCCB = useCallback((info :UploadChangeParam<UploadFile<any>>)=>{
        console.log(info);
        if(info.file.status === "uploading") setAvatarU(true);
        else if(info.file.status === "done"){
            messageApi!.success("修改头像成功");
            setAvatarU(false);
        }
        else{
            messageApi!.error("上传文件过程中出现错误！");
            setAvatarU(false);
        }
    }, []);
    const nicknameCCB = useCallback((event :React.FocusEvent<HTMLInputElement>)=>{
        if(event.target.value !== user.nickname){
            console.log("change", event.target.value);
            messageApi!.success("修改昵称成功");
        }
    }, []);
    const [deleteMOpen, setDeleteMOpen] = useState(false);
    const deleteOKCB = useCallback(()=>{
        console.log("delete");
        setLogin(false, "");
        nav(routes.main);
        messageApi!.success("删除账户请求已成功提交");
    }, []);
    return(<div className="p-16 flex flex-col items-center overflow-y-auto">
        <div className="flex flex-col gap-1 w-108 select-none">
            <h2 className="my-4">个人信息</h2>
            <div className="flex flex-row items-center mb-8">
                <div className="ml-2 mr-8">头像</div>
                <Upload action={`${meta.apiDomain}/v1/user/avatar`} listType="picture-circle" showUploadList={false} beforeUpload={beforeAvatarCCB} onChange={avatarCCB}>
                    <button type="button">
                        {avatarU ? <LoadingOutlined /> : <PlusOutlined />}
                        <div className="mt-4 text-sm">上传新头像</div>
                    </button>
                </Upload>
            </div>
            <label className="flex flex-row items-center mb-8">
                <div className="ml-2 mr-4">昵称</div>
                <div className="grow"><Input defaultValue={user.nickname} size="large" onBlur={nicknameCCB} placeholder="请输入昵称" /></div>
            </label>
            <h2 className="my-4">修改密码</h2>
            <label className="flex flex-row items-center mb-8">
                <div className="ml-2 mr-4">旧密码</div>
                <div className="grow"><Input size="large" placeholder="请输入旧密码" /></div>
            </label>
            <label className="flex flex-row items-center mb-8">
                <div className="ml-2 mr-4">新密码</div>
                <div className="grow"><Input size="large" placeholder="请输入新密码" /></div>
            </label>
            <label className="flex flex-row items-center mb-8">
                <div className="ml-2 mr-4">重复新密码</div>
                <div className="grow"><Input size="large" placeholder="请再次输入新密码" /></div>
            </label>
            <h2 className="my-4">账户设置</h2>
            <label className="flex flex-row items-center cursor-pointer w-full p-2 rounded-lg duration-100 hover:bg-neutral-200/60 active:bg-neutral-100">
                <div>个性化推荐</div>
                <div className="ml-auto"><Switch defaultChecked /></div>
            </label>
            <div className="flex flex-row items-center w-full p-2">
                <div>删除账户：本操作不可逆！请慎重考虑！</div>
                <div className="ml-auto"><Button danger onClick={()=>setDeleteMOpen(true)}>删除账户</Button></div>
                <Modal centered closable maskClosable okButtonProps={{autoInsertSpace: false}} cancelButtonProps={{autoInsertSpace: false}} open={deleteMOpen} onOk={deleteOKCB} onCancel={()=>setDeleteMOpen(false)} footer={(_: React.ReactNode, {OkBtn, CancelBtn})=>{
                    return(<div className="flex flex-col items-center gap-2">
                        <div className="flex flex-row justify-center gap-4">
                            <OkBtn />
                            <CancelBtn />
                        </div>
                    </div>);
                }}>
                    <div>删除账户：协议</div>
                    <div>你确定吗？</div>
                </Modal>
            </div>
        </div>
    </div>);
}