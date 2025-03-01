
//`/v1/status/getUser`.data
export type UserData = {
    id :number;
    nickname :string;
    phone :string;
    avatar_url :string;
    //Date
    joined_at :string;
};

//`/v1/user/delete`.data
export type UserDeleteResponse = {
    success :boolean;
    message :string;
};