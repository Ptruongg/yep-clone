import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUp/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import CreateBusiness from "./components/CreateBusiness/createBusiness";
import BusinessesList from "./components/Businesses/businessList";
import { authenticate } from "./store/session";
import EditBusiness from "./components/EditBusiness/editBusiness";
import BusinessDetails from "./components/BusinessDetails";
import CreateReviews from "./components/BusinessDetails/createReview";
import DeleteReview from "./components/DeleteReview/DeleteReview";
import EditReview from "./components/EditReview/editReview";
import BookmarksList from "./components/Bookmarks/index";
import DemoUser from "./components/DemoUser";
import ProfileButton from "./components/Navigation/ProfileButton";
import LoginFormModal from "./components/auth";
import Navigation from "./components/Navigation";

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
      <Navigation isLoaded={loaded} />
      {loaded && (
        <Switch>
          <Route path="/signup" >
            <SignUpForm />
          </Route>
          <Route path="/users" exact={true}>
            <UsersList />
          </Route>
          <Route path="/users/:userId" exact={true}>
            <User />
          </Route>
          <Route exact path="/">
            <BusinessesList />
          </Route>
          <Route path="/bookmarks/user/:userId">
            <BookmarksList />
          </Route>
          <Route path="/business/create" >
            <CreateBusiness />
          </Route>
          <Route path="/business/:businessId/edit">
            <EditBusiness />
          </Route>
          <Route path="/business/:businessId/createReview">
            <CreateReviews />
          </Route>
          <Route path="/business/:businessId/editReview">
            <EditReview />
          </Route>
          <Route path="/business/:businessId/delete">
            <DeleteReview />
          </Route>
          <Route path="/business/:businessId">
            <BusinessDetails />
          </Route>
          <Route path="*">
            <div className="pageNotFound">404 Page Not Found</div>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
