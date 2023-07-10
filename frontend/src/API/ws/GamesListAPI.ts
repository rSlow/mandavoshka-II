import {getStringRequest} from "../../utils/getStringRequest";
import {GamesListActions} from "../../schemas/ws/responses/gamesListResponses";


export default class GamesListAPI {
    static createGame(ws: WebSocket) {
        ws.send(getStringRequest({
            action: GamesListActions.create_game,
        }))
    }

    static joinGame(ws: WebSocket, gameId: number) {
        ws.send(getStringRequest({
            action: GamesListActions.join_game,
            game_id: gameId
        }))
    }
    static returnToGame(ws: WebSocket, gameId: number) {
        ws.send(getStringRequest({
            action: GamesListActions.return_to_game,
            game_id: gameId
        }))
    }
}