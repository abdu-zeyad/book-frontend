import React from "react";
import Header from "./Header";
// import IsLoadingAndError from "./IsLoadingAndError";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import BestBooks from "./BestBooks";
import Login from "./Login";
import { withAuth0 } from "@auth0/auth0-react";
import Profile from "./components/Profile";

class App extends React.Component {
  render() {
    const { user, isAuthenticated, loginWithRedirect, logout } =
      this.props.auth0;

    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header isAuth={isAuthenticated} logoutFunc={logout} />
          <Switch>
            <Route exact path="/">
              {isAuthenticated ? (
                <BestBooks userEmail={user.email} />
              ) : (
                <Login isAuth={isAuthenticated} loginFunc={loginWithRedirect} />
              )}
            </Route>
            <Route path="/profile">
              <Profile user={user} />
            </Route>
          </Switch>
          <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
