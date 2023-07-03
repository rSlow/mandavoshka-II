import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../index";
import UsersAPI from "../API/http/UsersAPI";
import {IUserResponse} from "../schemas/http/responses/userResponses";
import {WebSocketBaseResponse} from "../schemas/ws/responses/baseResponse";
import classes from "./isAuthApp.module.scss";

const IsAuthApp = () => {
    const userStore = useContext(Context).userStore
    const [users, setUsers] = useState<IUserResponse[]>([])

    const wsRef = useRef<WebSocket | null>(null)

    useEffect(() => {
        const API_WS_URL: string = process.env.REACT_APP_API_WS_ADDRESS || ""

        // wsRef.current = new WebSocket(`${wsBaseUrl}/ws/`)
        wsRef.current = new WebSocket(`${API_WS_URL}/ws/?token=${userStore.getToken()}`)

        wsRef.current.onopen = () => {
            console.log("ws opened")
        }
        wsRef.current.onmessage = (e: MessageEvent) => {
            const message: WebSocketBaseResponse = JSON.parse(e.data)
            console.log(message.data)
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

    function getActiveUsersFromWebSocket() {
        wsRef.current?.send(JSON.stringify({
            action: "list_staff",
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

            <button onClick={() => {
                getActiveUsersFromWebSocket()
            }}>
                Получить активных пользователей WS
            </button>
        </div>
    );
};

export default IsAuthApp;