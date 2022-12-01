import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import LoginFormModal from '../auth/index'
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SignUp from '.'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);


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
                      <LogoutButton />
                  </div>
              </div>
          </>
      );
  }
  return (
    <nav>
      <div>
        {/* <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaT-NcnLo4dUZBCe2abefSWdmECMUixI4AQw&usqp=CAU"></img>
          </NavLink>
        </div> */}

        {/* <div>
          <NavLink to='/login' exact={true} activeClassName='active'>

          </NavLink>
        </div> */}
        <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            <SignUp />
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
