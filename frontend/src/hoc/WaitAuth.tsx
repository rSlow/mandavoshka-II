import React from 'react';
import {observer} from "mobx-react-lite";
import {useUserStore} from "../hooks/useStore";

interface WaitAuthProps {
    children: React.ReactElement
}

const WaitAuth: React.FC<WaitAuthProps> = ({children}) => {
    const userStore = useUserStore()
    return (
        userStore.isAuthLoading
            ? <h2>Авторизация...</h2>
            : children
    );
};


export default observer(WaitAuth);