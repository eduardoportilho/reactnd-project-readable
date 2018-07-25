import React, { Component } from "react";

const AUTHORS = [
  "Binx Bolling",
  "Patrick Bateman",
  "Inigo Montoya",
  "Jay Gatsby",
  "Benno van Archimboldi"
];

class AuthorPicker extends Component {
  state = {
    author: ""
  };

  handleAuthorChange = event => {
    const { onAuthorChange } = this.props;
    const author = event.target.value;
    this.setState({ author: author }, () => onAuthorChange(author));
  };

  render() {
    const { author } = this.state;
    return (
      <label>
        Author:
        <select value={author} onChange={this.handleAuthorChange}>
          <option value="" disabled>
            Select one
          </option>
          {AUTHORS.map(anAuthor => (
            <option key={anAuthor} value={anAuthor}>
              {anAuthor}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

export default AuthorPicker;
