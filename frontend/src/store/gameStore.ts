import {makeAutoObservable} from "mobx";
import {WebSocketBaseResponse} from "../schemas/ws/responses/baseResponses";
import {GameActions, IGameDetail, WebSocketGameResponse} from "../schemas/ws/responses/gameResponses";
import GameAPI from "../API/ws/GameAPI";


export class GameStore {
    game: IGameDetail | null = null
    ws: WebSocket | null = null
    isGameLoading: boolean = false
    timeForMove: number | null = null

    constructor() {
        makeAutoObservable(this)
    }

    _reset() {
        this.game = null
        this.ws = null
        this.isGameLoading = false
    }

    init(apiUrl: string) {
        this.isGameLoading = true

        this.ws = new WebSocket(apiUrl)
        this.ws.onopen = () => {
            console.log("WS OPENED")
        }
        this.ws.onmessage = this._handleMessage

        this.isGameLoading = false
    }

    _handleUpdateData(data: IGameDetail) {
        console.log(data)
    }

    _handleError = (data: WebSocketBaseResponse) => {
        console.log(`ERROR ${data.response_status} FOR "${data.action}" QUERY - ${data.errors.join(", ")}`)
    }

    _handleMessage = (e: MessageEvent<string>) => {
        const data: WebSocketGameResponse = JSON.parse(e.data)
        const action = data.action
        if (data.response_status === 200) {
            switch (action) {
                case GameActions.send_game_data:
                    this._handleUpdateData(data.data)
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

}

const gameStoreObject = new GameStore()

export default gameStoreObject