import {UserStore} from "./userStore";
import {createContext} from "react";
import {GamesListStore} from "./gamesListStore";
import {GameStore} from "./gameStore";

interface IStoreContext {
    userStore: UserStore,
    gamesListStore: GamesListStore,
    gameStore: GameStore
}

export const StoreContext = createContext<IStoreContext | null>(null)

