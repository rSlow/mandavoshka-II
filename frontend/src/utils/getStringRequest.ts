import {BaseRequest, BaseRequestWithoutRequest} from "../schemas/ws/requests/baseRequest";

export function getStringRequest(data: BaseRequestWithoutRequest) {
    const request: BaseRequest = {
        request_id: new Date().getTime(),
        ...data
    }
    return JSON.stringify(request)
}