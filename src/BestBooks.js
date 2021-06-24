import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";
import "./BestBooks.css";
import axios from "axios";
import BookFormModal from "./components/BookFormModal";
import UpdateModal from "./components/UpdateModal";

class BestBooks extends React.Component {
  state = {
    data: [],
    err: "",
    showModal: false,
    updateShow: false,
    //for update modal:
    name: "",
    desc: "",
    status: "",
    id: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
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
    let url = `${serverUrl}/deletebooks/${id}`;

    let dataObj = {
      email: this.props.userEmail,
    };

    axios
      .delete(url, { params: dataObj })
      .then((data) => {
        this.setState({ data: data.data });
      })
      .catch((err) => {
        this.setState({ err: "There is an error" });
      });
  };

  showUpdateModal = (i) => {
    let bookObj = this.state.data[i];
    this.setState({
      updateShow: true,
      name: bookObj.name,
      desc: bookObj.desc,
      status: bookObj.status,
      id: bookObj._id,
    });
  };

  change = (e) => {
    if (e.target.name === "bookName") {
      this.setState({ name: e.target.value });
    } else if (e.target.name === "bookDesc") {
      this.setState({ desc: e.target.value });
    } else if (e.target.name === "select") {
      this.setState({ status: e.target.value });
    }
  };

  updateData = (e) => {
    e.preventDefault();

    let id = this.state.id;
    let serverUrl = process.env.REACT_APP_SERVER;
    let url = `${serverUrl}/updatebooks/${id}`;

    let updatedData = {
      email: this.props.userEmail,
      name: e.target.bookName.value,
      desc: e.target.bookDesc.value,
      status: e.target.select.value,
    };

    axios
      .put(url, updatedData)
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
    this.setState({ showModal: false, updateShow: false });
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
                  <Button
                    variant="primary"
                    onClick={() => this.showUpdateModal(i)}
                  >
                    Update
                  </Button>
                </Card.Body>
                <Card.Footer className="text-muted">{book.status}</Card.Footer>
              </Card>
            );
          })}
        </div>

        <BookFormModal
          show={this.state.showModal}
          closeFunc={this.closeModal}
          postFunc={this.postData}
        />

        <UpdateModal
          show={this.state.updateShow}
          closeFunc={this.closeModal}
          name={this.state.name}
          desc={this.state.desc}
          status={this.state.status}
          changeFunc={this.change}
          updateFunc={this.updateData}
        />
      </>
    );
  }
}

export default BestBooks;