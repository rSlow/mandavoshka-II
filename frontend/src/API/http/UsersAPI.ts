import {AxiosResponse} from 'axios'
import $axiosAPI from "../../http/index";
import {IUserResponse} from "../../schemas/http/responses/userResponses";
import {IUserRequestEdit} from "../../schemas/http/requests/userRequests";

export default class UsersAPI {
    static async get_all(): Promise<AxiosResponse<IUserResponse[]>> {
        return $axiosAPI.get<IUserResponse[]>("/accounts/users/")
    }

    static async get(userID: number): Promise<AxiosResponse<IUserResponse>> {
        return $axiosAPI.get<IUserResponse>(`/accounts/users/${userID}/`)
    }

    static async getMe(): Promise<AxiosResponse<IUserResponse>> {
        return $axiosAPI.get<IUserResponse>("/accounts/user/")
    }

    static async editMe(userData: IUserRequestEdit): Promise<AxiosResponse<IUserResponse>> {
        return $axiosAPI.put<IUserResponse>(
            "/accounts/user/",
            userData
        )
    }
}