import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyfavBook from "./MyFavoriteBooks";
import Profile from "./profile";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Books from "./Books"; // responsible for displaying the cats data
import AddBookForm from "./AddBookForm";
// import Form from './Form'; // display the form for sending the data to the backend

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      email: "",
      showBooksComponent: false,
      server: process.env.REACT_APP_SERVER_URL,
    };
  }

  getBooks = async (event) => {
    event.preventDefault();
    try {
      const paramsObj = {
        email: this.state.email,
      };

      const books = await axios.get(`${this.state.server}/books`, {
        params: paramsObj,
      });
      // const cats = await axios.get(`${this.state.server}/cat?name=${this.state.name}`);
      this.setState({
        books: books.data,
        showBooksComponent: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // updateName = (event) => {
  //   this.setState({
  //     name: event.target.value,
  //   });
  // };

  addBook = async (event) => {
    event.preventDefault();

    const bookFormData = {
      BookName: event.target.bookName.value,
      description: event.target.bookDescription.value,
      status: event.target.bookStatus.value,
      ownerEmail: this.state.email,
    };
    console.log(bookFormData);
    // const newCats = await axios.get(`${this.state.server}/addCat`, {params:catFormData});
    const newBooks = await axios.post(
      `${this.state.server}/addBook`,
      bookFormData
    );
    console.log("after adding", newBooks.data);
    // console.log(newCats);
    this.setState({
      books: newBooks.data,
    });
  };

  deleteBook = async (index) => {
    const ownerEmail = {
      email: this.state.email,
    };
    let newBooks = await axios.delete(
      `${this.state.server}/deleteBook/${index}`,
      { params: ownerEmail }
    );
    this.setState({
      books: newBooks.data,
    });
  };
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
              <AddBookForm addBookProps={this.addBook} />
              <Books
                books={this.state.books}
                showBooksComponent={this.state.showBooksComponent}
                deleteBookProps={this.deleteBook}
              />
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
