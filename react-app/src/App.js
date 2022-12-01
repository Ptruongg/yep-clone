import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUp/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import CreateBusiness from './components/CreateBusiness/createBusiness';
import BusinessesList from './components/Businesses/businessList';
import { authenticate } from './store/session';
import EditBusiness from './components/EditBusiness/editBusiness';
import BusinessDetails from './components/BusinessDetails';
import CreateReviews from './components/BusinessDetails/createReview';
import DeleteReview from './components/DeleteReview/DeleteReview';
import EditReview from './components/EditReview/editReview';
import DemoUser from "./components/DemoUser";
import ProfileButton from './components/Navigation/ProfileButton';
import LoginFormModal from './components/auth';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Switch>
          {/* <Route path='/login' exact={true}>
            <LoginForm />
            <DemoUser />
          </Route> */}
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
            <ProfileButton />
          </Route>
          <Route path='/users' exact={true} >
            <UsersList />
          </Route>
          <Route path='/users/:userId' exact={true} >
            <User />
          </Route>
          <Route exact path='/' >
            {/* <LoginFormModal /> */}
            <BusinessesList />
          </Route>
          <Route path='/business/create' exact={true}>
            <CreateBusiness />
          </Route>
          <Route path='/business/:businessId/edit' >
            <EditBusiness />
          </Route>
          <Route path='/business/:businessId/createReview' >
            <CreateReviews />
          </Route>
          <Route path='/business/:businessId/editReview'>
            <EditReview />
          </Route>
          <Route path='/business/:businessId/delete'>
            <DeleteReview />
          </Route>
          <Route path='/business/:businessId'>
            <BusinessDetails />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
