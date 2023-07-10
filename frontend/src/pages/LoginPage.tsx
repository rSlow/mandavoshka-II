import React, {useEffect} from 'react';
import useInput from "../hooks/useInput";
import {useUserStore} from "../hooks/useStore";
import Input from "../UI/Input/Input";
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
    const emailInput = useInput()
    const passwordInput = useInput()
    const userStore = useUserStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (userStore.isAuth) {
            navigate('/', {replace: true})
        }
    }, [navigate, userStore.isAuth])

    return (
        <div>
            <Input
                type="text"
                onChange={emailInput.onChange}
                placeholder="Логин"
                value={emailInput.inputValue}
            />
            <Input
                type="password"
                onChange={passwordInput.onChange}
                placeholder="Пароль"
                value={passwordInput.inputValue}
            />
            <button
                onClick={() => userStore.login({
                    email: emailInput.inputValue,
                    password: passwordInput.inputValue
                })}
                className="button"
            >
                Войти
            </button>
        </div>
    );
};

export default LoginPage;