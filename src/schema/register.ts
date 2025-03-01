import { UserData } from "./user";

//`POST /v1/user/register`
export type GetVerResponse = {
    success :boolean;
    status :string;
};

//`POST /v1/user/verify`
export type RegisterResponse = {
    success :boolean;
    access_token :string;
    status :string;
    user :UserData;
};