import axios from 'axios'
import {AccessTokenResponse} from "../schemas/http/responses/authResponses";
import userStoreObject from "../store/userStore";

const API_HTTP_URL: string = process.env.REACT_APP_API_HTTP_ADDRESS + "/api"

const $axiosAPI = axios.create({
    withCredentials: true,
    baseURL: API_HTTP_URL,
})

$axiosAPI.interceptors.request.use(function (config) {
    if (userStoreObject.isAuth || config.url === "/accounts/token/verify/") {
        config.headers.Authorization = `Bearer ${userStoreObject.getToken()}`
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
                "/accounts/token/refresh/"
            )
            userStoreObject.authenticate(response.data.access);
            return $axiosAPI.request(originalRequest);
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }
    console.log(error)
    throw error;
})

const $axiosInterceptorLessAPI = axios.create({
    withCredentials: true,
    baseURL: API_HTTP_URL,
})

export default $axiosAPI;
