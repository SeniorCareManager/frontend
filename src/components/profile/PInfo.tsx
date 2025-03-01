import { Input } from "antd";
import { UserData } from "../../schema/user";

export default function PInfo({ user } :{user :UserData}){
    return(<div className="p-8 overflow-y-auto">
        <h2>个人信息</h2>
        <Input />
    </div>);
}