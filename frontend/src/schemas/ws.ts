export interface WebSocketBaseAnswer {
    action: string,
    errors: string[],
    request_id: string,
    response_status: number,
    data: [] | null
}

export interface WebSocketAnswerOK extends WebSocketBaseAnswer {
    data: []
}