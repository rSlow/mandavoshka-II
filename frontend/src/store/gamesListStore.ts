import {makeAutoObservable} from "mobx";
import {
    GamesListActions,
    IGameInList,
    WebSocketGamesListResponse
} from "../schemas/ws/responses/gamesListResponses";
import {WebSocketBaseResponse} from "../schemas/ws/responses/baseResponses";
import GamesListAPI from "../API/ws/GamesListAPI";


export class GamesListStore {
    games: IGameInList[] = []
    ws: WebSocket | null = null

    canAddAndJoin: boolean = false
    gameToReturn: number | null = null

    isGamesLoading: boolean = false
    redirectRoomId: number | null = null

    constructor() {
        makeAutoObservable(this)
    }

    _reset() {
        this.games = []
        this.ws = null

        this.redirectRoomId = null
        this.isGamesLoading = false
    }

    init(apiUrl: string) {
        this.isGamesLoading = true

        this.ws = new WebSocket(apiUrl)
        this.ws.onopen = () => {
            console.log("WS OPENED")
        }
        this.ws.onmessage = this._handleMessage

        this.isGamesLoading = false
    }

    _handleCreateGame = (data: IGameInList) => {
        this.redirectRoomId = data.id
    }
    _handleJoinGame = (data: IGameInList) => {
        this.canAddAndJoin = false
        this.redirectRoomId = data.id
    }
    _handleSendGames = (data: IGameInList[]) => {
        this.games = data
    }
    _handleGameToReturn = (data: number | null) => {
        this.gameToReturn = data
        this.canAddAndJoin = data === null;
    }
    _handleReturnToGame = (data: IGameInList) => {
        this.redirectRoomId = data.id
    }
    _handleError = (data: WebSocketBaseResponse) => {
        console.log(`ERROR ${data.response_status} FOR "${data.action}" QUERY - ${data.errors.join(", ")}`)
    }

    _handleMessage = (e: MessageEvent<string>) => {
        const data: WebSocketGamesListResponse = JSON.parse(e.data)
        const action = data.action
        if (data.response_status === 200) {
            switch (action) {
                case GamesListActions.create_game:
                    this._handleCreateGame(data.data)
                    break

                case GamesListActions.send_games:
                    this._handleSendGames(data.data)
                    break

                case GamesListActions.join_game:
                    this._handleJoinGame(data.data)
                    break

                case GamesListActions.game_to_return:
                    this._handleGameToReturn(data.data)
                    break

                case GamesListActions.return_to_game:
                    this._handleReturnToGame(data.data)
                    break

                default:
                    console.log("WS DEFAULT")
            }
        } else {
            this._handleError(data)
        }
    }

    deInit() {
        if (this.ws) {
            this.ws.close()
        }
        this._reset()
    }

    createGame() {
        if (this.ws) {
            GamesListAPI.createGame(this.ws)
        }
    }

    joinGame(gameId: number) {
        if (this.ws) {
            GamesListAPI.joinGame(this.ws, gameId)
        }
    }

    returnToGame(gameId: number) {
        if (this.ws) {
            GamesListAPI.returnToGame(this.ws, gameId)
        }
    }
}

const gamesListStoreObject = new GamesListStore()

export default gamesListStoreObject