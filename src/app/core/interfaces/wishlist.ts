import { IUsersList } from "./basket";

export interface IWishlist {
    course_id: number;
    title: string;
    user_list: IUsersList[],
    course_creator: string;
}
