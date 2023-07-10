import React from 'react';
import c from './Navbar.module.scss'
import {NavLink} from "react-router-dom";
import './NabvarLinks.scss'
import {useUserStore} from "../../hooks/useStore";

const Navbar = () => {
    const userStore = useUserStore()

    return (
        <nav className={c.navbar}>
            {userStore.isAuth
                ? <>
                    <NavLink to='/'>Main page</NavLink>
                    <button onClick={() => userStore.deAuthenticate()}>Logout</button>
                </>
                : <>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/register'>Register</NavLink>
                </>
            }
        </nav>
    );
};

export default Navbar;