
//`/v1/admin/getnum/user`
export type GetUserNumResponse = {
    success :boolean;
    total_users :number;
};

//`/v1/status/getUser`
export type GetUserResponse = {
    success :boolean;
    request_type :"all" | "unique_query";
    data :UserData[] | UserData | string;
};

//`/v1/status/getUser`.data
export type UserData = {
    id :string;
    token_expiry :string;
    regtime :string;
    nickname :string;
    avatar :string;
    phone :string;
    status :"verified" | "pending";
};

//`/v1/user/delete`.data
export type UserDeleteResponse = {
    success :boolean;
    message :string;
};