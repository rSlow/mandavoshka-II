import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './reset.scss'
import {StoreContext} from './store/StoreContext'
import userStoreObject from "./store/userStore";
import gamesListStoreObject from "./store/gamesListStore";
import gameStoreObject from "./store/gameStore";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <StoreContext.Provider value={
        {
            userStore: userStoreObject,
            gamesListStore: gamesListStoreObject,
            gameStore: gameStoreObject
        }
    }>
        <App/>
    </StoreContext.Provider>
);
