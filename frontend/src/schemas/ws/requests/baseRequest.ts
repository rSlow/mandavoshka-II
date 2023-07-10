export interface BaseRequestWithoutRequest {
    action: string

    [key: string]: any
}

export interface BaseRequest extends BaseRequestWithoutRequest {
    request_id: number,
}