import {makeAutoObservable} from "mobx";
import {LoginRequest, RegisterRequest} from "../schemas/http/requests/authRequests";
import AuthAPI from "../API/http/AuthAPI";
import {AxiosResponse} from "axios";
import {AccessTokenResponse} from "../schemas/http/responses/authResponses";

const tokenField: string = "token"
export default class UserStore {
    isAuth = false
    isAuthLoading: boolean = !!this.getToken()
    // instant try to auth without loading components for isAuth = false state
    // it will be set *false* at the end refresh() method on mount App

    constructor() {
        makeAutoObservable(this)
    }

    getToken(): string | null {
        return localStorage.getItem(tokenField) || null
    }

    setToken(token: string): void {
        localStorage.setItem(tokenField, token)
    }

    delToken() {
        localStorage.removeItem(tokenField)
    }

    setAuthLoading(authLoading: boolean) {
        this.isAuthLoading = authLoading
    }

    authenticate(accessToken: string) {
        this.setToken(accessToken)
        this.isAuth = true
    }

    deAuthenticate() {
        this.delToken()
        this.isAuth = false
    }

    async _setAccessTokenFromPromise(promise: Promise<AxiosResponse<AccessTokenResponse>>) {
        this.setAuthLoading(true)
        try {
            const response = await promise
            const accessToken = response.data.access
            this.authenticate(accessToken)
        } catch (e: any) {
            console.log(e.response?.data)
            this.deAuthenticate()
        } finally {
            this.setAuthLoading(false)
        }
    }

    async login(data: LoginRequest) {
        await this._setAccessTokenFromPromise(AuthAPI.login(data))
    }

    async logout() {
        this.delToken()
        this.isAuth = false
    }

    async register(data: RegisterRequest) {
        await this._setAccessTokenFromPromise(AuthAPI.register(data))
    }

    async initAuth() {
        this.setAuthLoading(true)

        const token = this.getToken()
        try {
            if (token) {
                const response = await AuthAPI.tokenVerify()
                if (Object.keys(response.data).length === 0) {
                    this.authenticate(token)
                }
            }
        } catch (e: any) {
            console.log(e.response)
            this.deAuthenticate()
        } finally {
            this.setAuthLoading(false)
        }
    }

    async refresh() {
        await this._setAccessTokenFromPromise(AuthAPI.tokenRefresh())
    }
}
