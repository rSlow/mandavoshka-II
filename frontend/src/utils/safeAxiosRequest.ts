import {AxiosResponse} from "axios";

export default async function safeAxiosRequest(promise: Promise<AxiosResponse>) {
    try {
        return await promise
    } catch (e) {
        console.log(e)
    }
}