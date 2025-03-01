import localforage from "localforage";
import meta from "../meta";
import { UserData } from "./user";

export type LoginFormData = {
    phone :string;
    password :string;
    remember :boolean;
    agree :boolean;
};

//`POST /v1/user/login`
export type LoginResponse = {
    success :boolean;
    access_token :string;
    message :string;
    user :UserData;
};

export async function login(phone :string, password :string) :Promise<Response>{
    return fetch(`${meta.apiDomain}/v1/user/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({phone, password})
    });
}

export async function whoami() :Promise<UserData | null>{
    const AT = await localforage.getItem("access_token");
    if(AT === null) return null;
    else{
        const request = await (await fetch(`${meta.apiDomain}/v1/status/getUser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AT}`
            }
        })).json() as {success :boolean; data :UserData;};
        //如果data为错误string，则success必为false
        if(request.success) return request.data as UserData;
        else return null;
    }
}