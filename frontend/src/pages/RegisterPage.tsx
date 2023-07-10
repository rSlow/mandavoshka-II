import React from 'react';
import {useUserStore} from "../hooks/useStore";
import Input from "../UI/Input/Input";
import useInput from "../hooks/useInput";

const RegisterPage = () => {
    const usernameInput = useInput()
    const emailInput = useInput()
    const password1Input = useInput()
    const password2Input = useInput()
    const userStore = useUserStore()

    return (
        <div>
            <Input
                type="text"
                onChange={usernameInput.onChange}
                placeholder="Логин"
                value={usernameInput.inputValue}
            />
            <Input
                type="email"
                onChange={emailInput.onChange}
                placeholder="Электронная почта"
                value={emailInput.inputValue}
            />
            <Input
                type="password"
                onChange={password1Input.onChange}
                placeholder="Пароль"
                value={password1Input.inputValue}
            />
            <Input
                type="password"
                onChange={password2Input.onChange}
                placeholder="Повторите пароль"
                value={password2Input.inputValue}
            />
            <button
                onClick={() => userStore.register({
                    email: emailInput.inputValue,
                    username: usernameInput.inputValue,
                    password1: password1Input.inputValue,
                    password2: password2Input.inputValue,
                })}
            >
                Регистрация
            </button>
        </div>
    );
};

export default RegisterPage;