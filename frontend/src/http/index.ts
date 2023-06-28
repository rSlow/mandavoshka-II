import axios from 'axios'
import {userStore} from '../index'
import {AccessTokenResponse} from "../schemas/responses/authResponses";

const API_URL: string = 'http://127.0.0.1:8003/'

const $axiosAPI = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$axiosAPI.interceptors.request.use(function (config) {
    if (userStore.isAuth) {
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
            const response = await axios.post<AccessTokenResponse>(
                API_URL + "accounts/token/refresh/", {},
                {withCredentials: true}
            )
            userStore.authenticate(response.data.access);
            return $axiosAPI.request(originalRequest);
        } catch (e: any) {
            console.log(e.response?.data)
        }
    }
    throw error;
})

export default $axiosAPI