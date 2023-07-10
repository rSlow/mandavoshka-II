import {useState} from "react";
import {AxiosResponse} from "axios";

type FetchPromise = Promise<AxiosResponse | undefined>

interface AsyncFetching {
    fetching: () => FetchPromise,
    isLoading: boolean
}

export default function useAsyncFetching(promise: FetchPromise): AsyncFetching {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function fetching() {
        try {
            setIsLoading(true)
            return await promise
        } catch (e: any) {
            console.log(e.message)
        } finally {
            setIsLoading(false)
        }

    }

    return {fetching, isLoading}

}
