import React, {useContext, useState} from 'react';
import {Context} from "../index";

const RegisterForm = () => {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password1, setPassword1] = useState<string>("")
    const [password2, setPassword2] = useState<string>("")
    const userStore = useContext(Context).userStore

    return (
        <div>
            <input
                type="text"
                onChange={e => setUsername(e.target.value)}
                placeholder="Логин"
                value={username}
            />
            <input
                type="email"
                onChange={e => setEmail(e.target.value)}
                placeholder="Электронная почта"
                value={email}
            />
            <input
                type="password"
                onChange={e => setPassword1(e.target.value)}
                placeholder="Пароль"
                value={password1}
            />
            <input
                type="password"
                onChange={e => setPassword2(e.target.value)}
                placeholder="Повторите пароль"
                value={password2}
            />
            <button
                onClick={() => userStore.register({email, username, password1, password2})}
            >
                Войти
            </button>
        </div>
    );
};

export default RegisterForm;