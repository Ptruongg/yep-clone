import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../auth/index';
import BookmarksList from '../Bookmarks';
import * as sessionActions from "../../store/session"
import CreateBusiness from '../CreateBusiness/createBusiness';
import Search from '../Search/index.js';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const [search, setSearch] = useState("");
    // const [bookmarksInfo, setBookmarksInfo] = useState({ "business_ids": []})
    const searchForm = async (e) => {
        e.preventDefault();

        if (search.length > 0) {
            history.push(`/search/${search}`)
        } else {
            history.push(`/`)
        }
    }


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
                <div className='loginNavBar'>

                    <div id='navBarRight'>
                        <button className='create-business-button'>
                            <NavLink to="/business/create" exact={true} style={{ textDecoration: "none", color: "red", border: "none", marginBottom: "100px" }}>Create Your Business</NavLink>
                        </button>
                        <div>
                        <ProfileButton user={sessionUser} />
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div id='navBarRightLoad'>
                    <div>

                    </div>
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
        <div className='headerDiv'>
            <div id="home">
                <div id='logo'>
                    <NavLink to="/" exact={true}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaT-NcnLo4dUZBCe2abefSWdmECMUixI4AQw&usqp=CAU"></img>
                    </NavLink>
                </div>

                <div className='aboutMe'>
                    <div className='github' onClick={() => newTab('https://github.com/Ptruongg/yep-clone')}>
                        <img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' style={{ height: "30px", width: "30px", marginLeft: "10px", marginRight: "10px" }} />
                    </div>
                    <div className='linkedin' onClick={() => newTab('https://www.linkedin.com/in/truongphilip408/')}>
                        <img src='https://cdn-icons-png.flaticon.com/512/174/174857.png' style={{ height: "30px", width: "30px", marginLeft: "10px", marginRight: "10px" }} />
                    </div>
                    Developed by Philip Truong
                </div>

                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;
