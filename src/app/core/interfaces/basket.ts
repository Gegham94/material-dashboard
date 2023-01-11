export interface IBasket {
    course_id: number;
    title: string;
    user_list: IUsersList[],
    course_creator: string;
}

export interface IUsersList{
    avatar:string;
    user_id: number;
    user_name: string;
}
