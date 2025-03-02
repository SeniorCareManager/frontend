import { UserData } from "../../schema/user";

export default function Consultant({ user } :{user :UserData}){
    return(<div className="p-8 overflow-y-auto">
        <h2>我的顾问</h2>
    </div>);
}