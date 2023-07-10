import {GameStatus, WebSocketBaseResponse} from "./baseResponses";

export enum GamesListActions {
    create_game = "create_game",
    send_games = "send_games",
    join_game = "join_game",
    game_to_return = "game_to_return",
    return_to_game = "return_to_game",
}

export interface WebSocketGamesListResponse extends WebSocketBaseResponse {
    action: GamesListActions
}


export interface IGameInList {
    created_time: string
    id: number
    status: GameStatus,
    room_name: string
}
