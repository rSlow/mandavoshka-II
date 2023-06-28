export interface LoginRequest {
    email: string,
    password: string
}

export interface RegisterRequest {
    email: string,
    username: string,
    password1: string,
    password2: string,
}

export interface VerifyTokenRequest {
    token: string,
}
