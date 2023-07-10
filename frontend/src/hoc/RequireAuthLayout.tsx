import React from "react";
import {Navigate, Outlet} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {useUserStore} from "../hooks/useStore";

interface RequireAuthLayoutProps {
    reverse?: boolean
}

const RequireAuthLayout: React.FC<RequireAuthLayoutProps> = ({reverse = false}) => {
    const userStore = useUserStore()

    return userStore.isAuth && !reverse
        ? <Outlet/>
        : <Navigate to="/login" replace/>
};

export default observer(RequireAuthLayout);