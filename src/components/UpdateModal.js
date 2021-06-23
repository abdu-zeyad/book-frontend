import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

class UpdateModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.closeFunc}>
        <Modal.Header closeButton>
          <Modal.Title>Update book</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.props.updateFunc}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book name"
                name="bookName"
                value={this.props.name}
                onChange={this.props.changeFunc}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Book Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book description"
                name="bookDesc"
                value={this.props.desc}
                onChange={this.props.changeFunc}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Status</Form.Label> <br />
              <select
                name="select"
                className="modalFormSelect"
                value={this.props.status}
                onChange={this.props.changeFunc}
              >
                <option>Select Status</option>
                <option value="life-changing">Life changing</option>
                <option value="favorite-five">Favorite five</option>
                <option value="recommanded-to-me">Recommanded to me</option>
              </select>
            </Form.Group>

            <button
              variant="primary"
              type="submit"
              onClick={this.props.closeFunc}
              className="btn btn-primary mr-2"
            >
              Submit
            </button>
            <Button variant="secondary" onClick={this.props.closeFunc}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UpdateModal;
