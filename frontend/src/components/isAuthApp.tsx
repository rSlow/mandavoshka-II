import React, {useContext, useState} from 'react';
import {Context} from "../index";
import UsersAPI from "../API/UsersAPI";
import {IUser} from "../schemas/AuthSchemas";

const IsAuthApp = () => {
    const userStore = useContext(Context).userStore
    const [users, setUsers] = useState<IUser[]>([])

    async function getUsers() {
        const response = await UsersAPI.get_all()
        setUsers(response.data)
    }

    return (
        <div>
            <h1>АВТОРИЗОВАН</h1>
            <button onClick={() => userStore.refresh()}>
                Обновить токен
            </button>
            <button onClick={() => userStore.logout()}>
                Выйти
            </button>
            <button onClick={getUsers}>
                Получить пользователей
            </button>
            {users.map(user =>
                <div key={user.id}>
                    {JSON.stringify(user)}
                </div>
            )}
        </div>
    );
};

export default IsAuthApp;