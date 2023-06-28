import LoginForm from "./components/LoginForm";
import React, {useContext, useEffect} from "react";
import {Context} from './index'
import {observer} from "mobx-react-lite";
import IsAuthApp from "./components/isAuthApp";
import RegisterForm from "./components/RegisterForm";

const App = () => {
    const userStore = useContext(Context).userStore
    useEffect(() => {
        const token = userStore.getToken()
        if (token) {
            userStore.refresh()
        }
    }, [userStore])

    return (
        <div>
            <pre id="wsResponse"></pre>
            {userStore.isAuthLoading
                ? <h2>Авторизация...</h2>
                : userStore.isAuth
                    ? <IsAuthApp/>
                    : <div>
                        <LoginForm/>
                        <br/>
                        <RegisterForm/>
                    </div>
            }
        </div>
    );
};

export default observer(App);