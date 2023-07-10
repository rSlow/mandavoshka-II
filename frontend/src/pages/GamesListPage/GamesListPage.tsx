import React, {useEffect} from 'react';
import c from "./GamesListPage.module.scss";
import GamesList from "../../components/GamesList/GamesList";
import Button, {Colors} from "../../UI/Button/Button";
import {useGamesListStore, useUserStore} from "../../hooks/useStore";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";


const GamesListPage: React.FC = () => {
    const userStore = useUserStore()
    const gamesListStore = useGamesListStore()
    const navigate = useNavigate()
    const API_WS_DOMAIN = process.env.REACT_APP_API_WS_ADDRESS || ""
    const API_WS_URL = `${API_WS_DOMAIN}/games/?token=${userStore.getToken()}`

    useEffect(() => {
        gamesListStore.init(API_WS_URL)
        return () => {
            gamesListStore.deInit()
        }
    }, [gamesListStore, API_WS_URL])

    useEffect(() => {
        const redirectRoomId = gamesListStore.redirectRoomId
        if (redirectRoomId) {
            navigate(`/game/${redirectRoomId}`)
        }
    }, [navigate, gamesListStore.redirectRoomId])

    return (
        <div className={c.rooms}>
            <h1 className={c.auth_header}>АВТОРИЗОВАН</h1>
            {gamesListStore.isGamesLoading
                ? <h2>Загрузка игр...</h2>
                : <GamesList
                    games={gamesListStore.games}
                    canAddAndJoin={gamesListStore.canAddAndJoin}
                    gameToReturn={gamesListStore.gameToReturn}
                />
            }
            {gamesListStore.canAddAndJoin &&
                <Button variant={Colors.success} onClick={() => gamesListStore.createGame()}>
                    Добавить комнату
                </Button>
            }
        </div>
    );
};

export default observer(GamesListPage);