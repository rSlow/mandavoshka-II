import React from 'react';
import {IGameInList} from "../../schemas/ws/responses/gamesListResponses";
import GameCard from "./GameCard";

interface GamesListProps extends React.HTMLProps<HTMLDivElement> {
    games: IGameInList[],
    gameToReturn: number | null,
    canAddAndJoin: boolean
}


const GamesList: React.FC<GamesListProps> = (
    {
        games,
        gameToReturn,
        canAddAndJoin,
        ...props
    }
) => {
    return (
        <div {...props}>
            {!!games.length
                ? games.map(game =>
                    <GameCard
                        key={game.id}
                        game={game}
                        joinable={canAddAndJoin}
                        returnable={gameToReturn === game.id}
                    />
                )
                : <h2>Игр еще нет!</h2>}
        </div>

    );
};

export default GamesList;