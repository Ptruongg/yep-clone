import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link, NavLink, useHistory } from "react-router-dom"
import "./Navigation.css"

function ProfileButton({user}) {
    const dispatch = useDispatch();
    const history = useHistory();
    // console.log("user,", user)

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/")
    };
    const getUserBookmarks = (e) => {
        e.preventDefault();

    }

    return (
        <>
            <div className="button">
                <button className="navBar" onClick={openMenu}>
                    <i className="fas fa-bars nav_bars_icon"></i>
                    <i className="fas fa-user-circle user_icon"></i>
                </button>
                {showMenu && (
                    <div id="menu">
                        {/* <li >
                            <div>{user.first_name}</div>
                        </li>
                        <li>
                            <div>{user.email}</div>
                        </li> */}
                        <NavLink to ='/myBookmarks'>
                            My Bookmarks
                        </NavLink>
                        <li>
                            <div style={{cursor: "pointer"}} onClick={logout}>Log Out</div>
                        </li>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProfileButton;
