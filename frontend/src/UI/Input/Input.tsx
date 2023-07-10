import React, {HTMLProps} from 'react';
import c from './Input.module.scss'

interface inputProps extends HTMLProps<HTMLInputElement> {
    withLabel?: boolean
}

const Input = (props: inputProps) => {
    return (
        <input className={c.input} {...props}/>
    );
};

export default Input;