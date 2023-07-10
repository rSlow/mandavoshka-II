import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RequireAuthLayout from "./hoc/RequireAuthLayout";
import WaitAuth from "./hoc/WaitAuth";
import GamePage from "./pages/GamePage/GamePage";
import NotFoundPage from "./pages/NotFoundPage";
import GamesListPage from "./pages/GamesListPage/GamesListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar/Navbar";
import RequireNotAuth from "./hoc/RequireNotAuth";
import {useUserStore} from "./hooks/useStore";

const App = () => {
    const userStore = useUserStore()
    useEffect(() => {
        userStore.initAuth()
    }, [userStore])

    return (
        <WaitAuth>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<RequireAuthLayout/>}>
                        <Route index element={<GamesListPage/>}/>
                        <Route path="game/:id" element={<GamePage/>}/>
                    </Route>
                    <Route path="/login" element={<RequireNotAuth><LoginPage/></RequireNotAuth>}/>
                    <Route path="/register" element={<RequireNotAuth><RegisterPage/></RequireNotAuth>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
        </WaitAuth>
    );
};

export default observer(App);