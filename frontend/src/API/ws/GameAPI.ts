import {getStringRequest} from "../../utils/getStringRequest";
import {GameActions} from "../../schemas/ws/responses/gameResponses";


export default class GamesListAPI {
    static test(ws: WebSocket) {
        // ws.send(getStringRequest({
        //     action: GameActions.test,
        // }))
    }

}