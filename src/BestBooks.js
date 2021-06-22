import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";
import "./BestBooks.css";
import axios from "axios";
import BookFormModal from "./components/BookFormModal";

class BestBooks extends React.Component {
  state = {
    data: [],
    err: "",
    showModal: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // get data from express server (get mongodb data)
    let serverUrl = process.env.REACT_APP_SERVER;
    let url = `${serverUrl}/books`;

    let obj = {
      email: this.props.userEmail,
    };

    axios
      .get(url, { params: obj })
      .then((data) => {
        this.setState({ data: data.data });
      })
      .catch((err) => {
        this.setState({ err: "There is no books" });
      });
  };

  postData = (e) => {
    e.preventDefault();

    let dataObj = {
      email: this.props.userEmail,
      name: e.target.bookName.value,
      desc: e.target.bookDesc.value,
      status: e.target.select.value,
    };

    let serverUrl = process.env.REACT_APP_SERVER;
    let url = `${serverUrl}/addbooks`;

    axios
      .post(url, dataObj)
      .then((data) => {
        this.setState({ data: data.data });
      })
      .catch((err) => {
        this.setState({ err: "There is an error" });
      });
  };

  deleteData = (e) => {
    let serverUrl = process.env.REACT_APP_SERVER;
    let id = e.target.name;
    let url = `${serverUrl}/deletebooks/${id}`; // id is params

    let dataObj = {
      email: this.props.userEmail,
    };

    axios
      .delete(url, { params: dataObj }) // email is query
      .then((data) => {
        this.setState({ data: data.data });
      })
      .catch((err) => {
        this.setState({ err: "There is an error" });
      });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <h1>My Best books</h1>
        <Button onClick={this.showModal}>Add a Book</Button>
        <div className="cards">
          {this.state.data.map((book, i) => {
            return (
              <Card className="text-center" key={i}>
                <Card.Header>{book.name}</Card.Header>
                <Card.Body>
                  <Card.Text>{book.desc}</Card.Text>
                  <Button
                    variant="primary"
                    name={book._id}
                    onClick={this.deleteData}
                  >
                    Delete
                  </Button>
                </Card.Body>
                <Card.Footer className="text-muted">{book.status}</Card.Footer>
              </Card>
            );
          })}
        </div>

        {/* modal */}
        <BookFormModal
          show={this.state.showModal}
          closeFunc={this.closeModal}
          postFunc={this.postData}
        />
      </>
    );
  }
}

export default BestBooks;
