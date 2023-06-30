import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../index";
import UsersAPI from "../API/UsersAPI";
import {IUser} from "../schemas/AuthSchemas";
import {WebSocketBaseAnswer} from "../schemas/ws";
import classes from "./isAuthApp.module.scss";

const IsAuthApp = () => {
    const userStore = useContext(Context).userStore
    const [users, setUsers] = useState<IUser[]>([])
    const wsBaseUrl: string = "ws://localhost:8003"

    const wsRef = useRef<WebSocket | null>()

    useEffect(() => {
        // wsRef.current = new WebSocket(`${wsBaseUrl}/ws/`)
        wsRef.current = new WebSocket(`${wsBaseUrl}/ws/?token=${userStore.getToken()}`)

        wsRef.current.onopen = () => {
            console.log("ws opened")
        }
        wsRef.current.onmessage = (e: MessageEvent) => {
            console.log(typeof e)
            const message: WebSocketBaseAnswer = JSON.parse(e.data)
            console.log(message)
            console.log(message.response_status)
        }
        return () => {
            wsRef.current?.close()
        }

    }, [userStore])

    async function getUsersFromHTTP() {
        const response = await UsersAPI.get_all()
        setUsers(response.data)
    }

    function getUsersFromWebSocket() {
        wsRef.current?.send(JSON.stringify({
            action: "list",
            request_id: new Date().getTime()
        }))
    }

    return (
        <div>
            <h1 className={classes.red}>АВТОРИЗОВАН</h1>
            <button onClick={() => userStore.refresh()}>
                Обновить токен
            </button>
            <button onClick={() => userStore.logout()}>
                Выйти
            </button>

            <button onClick={getUsersFromHTTP}>
                Получить пользователей HTTP
            </button>

            <hr/>
            {users.map(user =>
                <div key={user.id}>
                    {JSON.stringify(user)}
                </div>
            )}

            <hr/>

            <button onClick={() => {
                getUsersFromWebSocket()
            }}>
                Получить пользователей WS
            </button>
        </div>
    );
};

export default IsAuthApp;