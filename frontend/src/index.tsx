import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/userStore";

interface StoreContext {
    userStore: UserStore,
}

export const userStore = new UserStore()
export const Context = createContext<StoreContext>({userStore})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Context.Provider value={{userStore}}>
        <App/>
    </Context.Provider>
);
