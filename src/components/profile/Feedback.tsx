import { UserData } from "../../schema/user";

export default function Feedback({ user } :{user :UserData}){
    return(<div className="p-8 overflow-y-auto">
        <h2>咨询反馈</h2>
    </div>);
}