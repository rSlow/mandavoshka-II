import LoginForm from "./components/LoginForm";
import React, {useContext, useEffect} from "react";
import {Context} from './index'
import {observer} from "mobx-react-lite";
import IsAuthApp from "./components/isAuthApp";

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
                    : <LoginForm/>
            }
        </div>
    );
};

export default observer(App);