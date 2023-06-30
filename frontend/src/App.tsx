import LoginForm from "./components/LoginForm";
import React, {useContext, useEffect} from "react";
import {Context} from './index'
import {observer} from "mobx-react-lite";
import IsAuthApp from "./components/isAuthApp";
import RegisterForm from "./components/RegisterForm";

const App = () => {
    const userStore = useContext(Context).userStore
    useEffect(() => {
        userStore.initAuth()
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
                        <RegisterForm/>
                    </div>
            }
        </div>
    );
};

export default observer(App);