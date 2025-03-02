import { UserData } from "../../schema/user";

export default function Services({ user } :{user :UserData}){
    return(<div className="p-8 overflow-y-auto">
        <h2>我的服务</h2>
    </div>);
}