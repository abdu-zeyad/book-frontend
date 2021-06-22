import React, { Component } from "react";

class AddBookForm extends Component {
  render() {
    return (
      <form onSubmit={(e) => this.props.addBookProps(e)}>
        <label>Book Name</label>
        <input type="text" name="bookName" />
        <label>book Description</label>
        <input type="text" name="bookDescription" />
        <label>book status</label>
        <input type="text" name="bookStatus" />

        <input type="submit" value="Add Book" />
      </form>
    );
  }
}

export default AddBookForm;
