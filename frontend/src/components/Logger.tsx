import React, {useEffect} from 'react';

const Logger = () => {
    useEffect(() => {
        console.log("LOADER MOUNTED")
        return () => {
            console.log("LOADER UNMOUNTED")
        }
    }, [])
    return (
        <></>
    );
};

export default Logger;