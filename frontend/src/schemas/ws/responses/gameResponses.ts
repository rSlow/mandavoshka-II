import {GamesListActions, IGameInList} from "./gamesListResponses";
import {WebSocketBaseResponse} from "./baseResponses";

export enum GameActions {
    send_game_data = "send_game_data",
    move_chip = "move_chip",
    redeem_chip = "redeem_chip",
    return_chip_from_center = "return_chip_from_center",

}

export interface WebSocketGameResponse extends WebSocketBaseResponse {
    action: GameActions
}

export interface IGameDetail extends IGameInList {

}
