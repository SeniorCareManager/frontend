﻿import { UserData } from "../../schema/user";

export default function PInfo({ user } :{user :UserData}){
    return(<div className="p-8 overflow-y-auto">
        <h2>投资画像</h2>
    </div>);
}