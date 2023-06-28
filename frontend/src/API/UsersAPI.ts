import {AxiosResponse} from 'axios'
import $axiosAPI from "../http";
import {IUser} from "../schemas/AuthSchemas";

export default class UsersAPI {
    static async get_all(): Promise<AxiosResponse<IUser[]>> {
        return $axiosAPI.get<IUser[]>("/accounts/users/")
    }
}