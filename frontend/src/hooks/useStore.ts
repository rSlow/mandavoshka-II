import {useContext} from "react";
import {StoreContext} from "../store/StoreContext";

export function useStore() {
    const storeContext = useContext(StoreContext)
    if (storeContext === null) {
        throw new Error("storeContext is null. maybe, you did not wrap your app in context?")
    }
    return storeContext
}

export function useUserStore() {
    return useStore().userStore
}

export function useGamesListStore() {
    return useStore().gamesListStore
}

export function useGameStore() {
    return useStore().gameStore
}
