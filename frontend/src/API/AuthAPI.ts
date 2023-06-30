import {AxiosResponse} from 'axios'
import $axiosAPI, {$axiosInterceptorLessAPI} from "../http";
import {AccessTokenResponse, VerifyTokenResponse} from "../schemas/responses/authResponses";
import {LoginRequest, RegisterRequest} from "../schemas/requests/authRequests";

type AxiosAuthResponse = AxiosResponse<AccessTokenResponse>
export default class AuthAPI {
    static async login(data: LoginRequest): Promise<AxiosAuthResponse> {
        return $axiosAPI.post<AccessTokenResponse>("/accounts/login/", data)
    }

    static async register(data: RegisterRequest): Promise<AxiosAuthResponse> {
        return $axiosAPI.post<AccessTokenResponse>('/accounts/register/', data)
    }

    static async tokenRefresh(): Promise<AxiosAuthResponse> {
        return $axiosAPI.post<AccessTokenResponse>("/accounts/token/refresh/")
    }

    static async tokenVerify(token: string): Promise<AxiosResponse<VerifyTokenResponse>> {
        return $axiosAPI.post<object>("/accounts/token/verify/")
    }
}