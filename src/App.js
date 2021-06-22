import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyfavBook from "./MyFavoriteBooks";
import Profile from "./profile";
import { withAuth0 } from "@auth0/auth0-react";

class App extends React.Component {
  render() {
    console.log("app", this.props);
    const { isAuthenticated } = this.props.auth0;

    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {isAuthenticated && <MyfavBook />}
              {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}
            </Route>
            <Profile />
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
