import axios from 'axios'
import {userStore} from '../index'
import {AccessTokenResponse} from "../schemas/responses/authResponses";

const API_URL: string = process.env.REACT_APP_API_ADDRESS || ""

const $axiosAPI = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$axiosAPI.interceptors.request.use(function (config) {
    console.log(config)
    if (userStore.isAuth || config.url === "/accounts/token/verify/") {
        config.headers.Authorization = `Bearer ${userStore.getToken()}`
    }
    return config
})

$axiosAPI.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await $axiosInterceptorLessAPI.post<AccessTokenResponse>(
                "accounts/token/refresh/"
            )
            userStore.authenticate(response.data.access);
            return $axiosAPI.request(originalRequest);
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }
    throw error;
})

export const $axiosInterceptorLessAPI = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

export default $axiosAPI