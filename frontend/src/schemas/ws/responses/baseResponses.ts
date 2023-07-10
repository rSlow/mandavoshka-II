export interface WebSocketBaseResponse {
    action: any,
    errors: string[],
    request_id: string,
    response_status: number,
    data: any
}


export enum GameStatus {
    created = "created",
    ready = "ready",
    started = "started",
    paused = "paused",
    ended = "ended",
}