import React, { Component } from "react";

export class Books extends Component {
  render() {
    return (
      <>
        {this.props.showBooksComponent &&
          this.props.books.map((book, idx) => {
            return (
              <div key={idx}>
                <div>
                  name : {book.bookName}
                  <button onClick={() => this.props.deleteBookProps(idx)}>
                    X
                  </button>
                </div>
                {/* <p>breed: {cat.breed}</p> */}
              </div>
            );
          })}
      </>
    );
  }
}

export default Books;
