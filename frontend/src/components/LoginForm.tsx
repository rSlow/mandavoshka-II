import React, {useContext, useState} from 'react';
import {Context} from "../index";

const LoginForm = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const userStore = useContext(Context).userStore

    return (
        <div>
            <input
                type="text"
                onChange={e => setEmail(e.target.value)}
                placeholder="Логин"
                value={email}
            />
            <input
                type="password"
                onChange={e => setPassword(e.target.value)}
                placeholder="Пароль"
                value={password}
            />
            <button
                onClick={() => userStore.login({
                    email: email,
                    password: password
                })}
            >
                Войти
            </button>
        </div>
    );
};

export default LoginForm;