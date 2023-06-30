export interface AccessTokenResponse {
    access: string
}

export interface VerifyTokenResponse {
    detail?: string,
    code?: string
}