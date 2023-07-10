import React, {useState} from "react";

export default function useInput(defaultValue: string = "") {
    const [inputValue, setInputValue] = useState<string>(defaultValue)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    return {
        inputValue,
        onChange
    }
}