import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../auth/index';
import BookmarksList from '../Bookmarks';
import * as sessionActions from "../../store/session"
import CreateBusiness from '../CreateBusiness/createBusiness';
import SearchBusiness from '../SearchBusiness';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const [search, setSearch] = useState("");
    const [url, setUrl] = useState('https://photos.smugmug.com/photos/i-ZcW3j56/0/X4/i-ZcW3j56-X4.jpg');
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const images = ['https://photos.smugmug.com/photos/i-Vhwkfx6/0/X2/i-Vhwkfx6-X2.jpg', 'https://i.imgur.com/fXZuXu8.jpg', 'https://photos.smugmug.com/photos/i-6m22HpM/0/X2/i-6m22HpM-X2.jpg', 'https://photos.smugmug.com/photos/i-Sn8rswX/1/X4/i-Sn8rswX-X4.jpg'];
        let scroll = setInterval(() => {
            if (index === 3) {
                setIndex(0)
            }
            else {
                setIndex((index) => index + 1)
            }
            return setUrl(images[index])
        }, 4000)
        return () => clearInterval(scroll)
    }, [index, url])

    const handleForm = async (e) => {
        e.preventDefault();


        if (search.length > 0) {
            history.push(`/search/${search}`);
        } else {
            history.push(`/`);
        }
    };


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
                        <div className='create-business-button'>
                            <NavLink to="/business/create" exact={true} style={{ textDecoration: "none", color: "white", border: "none", width: "100px", marginBottom: "100px", borderRadius: "30px", position: "relative" }}>Create Your Business</NavLink>
                        </div>
                        <div className='profileButton-drop'>
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

                    <div id='loginButtonDiv'>
                        <LoginFormModal />
                        <div className='logout-button' onClick={logout}></div>
                    </div>
                    <div className='signUp'>
                        <NavLink id='signUp' to="/signup">Sign Up</NavLink>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className='headerDiv'>
            <div className="imgNav">
                <img src={url} alt="" className="image-scroll"></img>
            </div>
            <div id="home">
                <div id='logo'>
                    <NavLink to="/" exact={true}>
                        <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/a28dqk0ou5spbsttmdey" style={{ height: "75px", borderRadius: "30px" }}></img>
                    </NavLink>
                </div>

                <div className="banner-container">
                    <div className="banner-content">
                        <div className="banner-form-container">
                            <div className='searchDivsss'>
                                <form className="banner-search">
                                    <label htmlFor="search">
                                        <input
                                            type="text"
                                            className="banner-search-input"
                                            autoComplete="off"
                                            id="search"
                                            placeholder="Search Automotive Shops"
                                            maxLength="50"
                                            value={search}
                                            required
                                            onChange={(e) => setSearch(e.target.value)}

                                        ></input>
                                    </label>
                                    <button className="searchSubmitButton" onClick={handleForm} style={{ height: "55px", width: "75px", borderRadius: "25px", borderColor: "black", backgroundColor: "red", position: "absolute", bottom: "155px", right: "770px" }}>
                                        <i class="fa-solid fa-magnifying-glass" style={{ color: 'white', position: "relative" }}></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;
