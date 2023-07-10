import React from 'react';
import {useUserStore} from "../hooks/useStore";
import {Navigate} from "react-router-dom";

interface RequireNotAuthProps {
    children: React.ReactElement
}

const RequireNotAuth: React.FC<RequireNotAuthProps> = ({children}) => {
    const userStore = useUserStore()

    return (
        userStore.isAuth
            ? <Navigate to="/" replace/>
            : children
    );
};

export default RequireNotAuth;