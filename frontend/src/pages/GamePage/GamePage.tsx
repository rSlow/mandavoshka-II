import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useGameStore, useUserStore} from "../../hooks/useStore";

const GamePage = () => {
    const userStore = useUserStore()
    const gameStore = useGameStore()
    const params = useParams<{ id: string }>()
    const API_WS_DOMAIN = process.env.REACT_APP_API_WS_ADDRESS || ""
    const API_WS_URL = `${API_WS_DOMAIN}/games/${params.id}/?token=${userStore.getToken()}`

    useEffect(() => {
        gameStore.init(API_WS_URL)
        return () => {
            gameStore.deInit()
        }
    }, [gameStore, API_WS_URL])

    return (
        <div>
            <Link to="/">К списку комнат</Link>
            <hr/>
        </div>
    );
};

export default GamePage;