import React from 'react';
import {IGameInList} from "../../schemas/ws/responses/gamesListResponses";
import {useGamesListStore} from "../../hooks/useStore";

interface GameCardProps {
    game: IGameInList,
    joinable: boolean,
    returnable: boolean
}

const GameCard: React.FC<GameCardProps> = (
    {
        game,
        joinable,
        returnable,
    }
) => {
    const gamesListStore = useGamesListStore()

    return (
        <div style={{display: "flex", columnGap: 10}}>
            <div>
                Комната ID #{game.id}
            </div>
            {joinable &&
                <button onClick={() => gamesListStore.joinGame(game.id)}>
                    Присоединиться
                </button>
            }
            {returnable &&
                <button onClick={() => gamesListStore.returnToGame(game.id)}>
                    Вернуться
                </button>
            }
        </div>
    );
};

export default GameCard;