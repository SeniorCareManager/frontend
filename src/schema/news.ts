
//GET `v1/news/getInfo`
export type GetNewsResponse = {
    success :boolean;
    message :News1[];
};

export type News1 = {
    news_id :string;
    title :string;
    time :string;
};

//GET `v1/news/getDetail?id=${news_id}`
export type GetNewsDetailResponse = {
    success :boolean;
    message: {
        news_id :string;
        title :string;
        time :string;
        content :string;
        author :string;
        type :"01" | "02" | "03" | "04";
        source :string;
        theme :string;
    };
};