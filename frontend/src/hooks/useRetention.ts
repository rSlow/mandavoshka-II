import {useEffect, useState} from "react";

export default function useRetention(value: string, delay: number) {
    const [retentionValue, setRetentionValue] = useState<string>(value)

    useEffect(() => {
        const timeoutHandler = setTimeout(() => {
            setRetentionValue(value)
        }, delay)

        return () => {
            clearTimeout(timeoutHandler)
        }
    }, [value, delay])

    return retentionValue
}