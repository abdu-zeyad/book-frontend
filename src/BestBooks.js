import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";
import "./BestBooks.css";
import axios from "axios";
import BookFormModal from "./components/BookFormModal";
// import UpdateCatForm from './UpdateCatForm';

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
    console.log(url);
    console.log(this.state.data);
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
    console.log(this.dataobj);
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
  //////////////////
  // updateCat = async (event) => {
  //   event.preventDefault();
  //   const catData = {
  //     catName: event.target.catName.value,
  //     catBreed: event.target.catBreed.value,
  //     ownerName: this.state.name,
  //   };

  //   let catsData = await axios.put(
  //     `${this.state.server}/updateCat/${this.state.index}`,
  //     catData
  //   );

  //   this.setState({
  //     cats: catsData.data,
  //   });

  //   // console.log(this.cats);
  // };

  // showUpdateForm = (idx) => {
  //   this.setState({
  //     show: true,
  //     index: idx,
  //     catName: this.state.cats[idx].catName,
  //     catBreed: this.state.cats[idx].breed,
  //   });
  // };

  // updateCatName = (e) => {
  //   this.setState({
  //     catName: e.target.value,
  //   });
  // };

  // updateCatBreed = (e) => {
  //   this.setState({
  //     catBreed: e.target.value,
  //   });
  // };
  // /////////////////////////////
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
        {/* <UpdateCatForm
            updateCats={this.updateCat}
            catName={this.state.catName}
            catBreed={this.state.catBreed}
            updateCatNameProps={this.updateCatName}
            updateCatBreedProps={this.updateCatBreed}

            /> */}
      </>
    );
  }
}

export default BestBooks;
