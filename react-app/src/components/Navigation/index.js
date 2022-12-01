import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../auth/index';
import * as sessionActions from "../../store/session"
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()


    const newTab = (url) => {
        window.open(url, '_blank', 'noopener, noreferrer')
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout)
        history.push('/');
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div id='navBarRight'>
                    <ProfileButton user={sessionUser} />
                </div>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div id='navBarRightLoad'>
                    <div id='loginButtonDiv'>
                        <LoginFormModal />
                        <div>
                            <NavLink id='signUp' to="/signup">Sign Up</NavLink>
                        </div>
                        <div className='logout-button' onClick={logout}></div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <nav>
            <div id="home">

                <div id='logo'>
                    <NavLink to="/" exact={true}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaT-NcnLo4dUZBCe2abefSWdmECMUixI4AQw&usqp=CAU"></img>
                    </NavLink>
                </div>
                <div className='aboutMe'>
                    <div className='github' onClick={() => newTab('https://github.com/Ptruongg/airbnb-cl0ne')}>
                        Github
                    </div>
                    <div className='name'>
                        Developed by Philip Truong
                    </div>
                </div>
                {isLoaded && sessionLinks}
            </div>
        </nav>
    );
}

export default Navigation;