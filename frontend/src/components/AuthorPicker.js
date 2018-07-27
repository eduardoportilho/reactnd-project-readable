import React, { Component } from "react";

const AUTHORS = [
  "Binx Bolling",
  "Patrick Bateman",
  "Inigo Montoya",
  "Jay Gatsby",
  "Benno van Archimboldi"
];

class AuthorPicker extends Component {
  handleAuthorChange = event => {
    const { onAuthorChange } = this.props;
    const author = event.target.value;
    this.setState({ author: author }, () => onAuthorChange(author));
  };

  render() {
    const { disabled, author } = this.props;
    return (
      <label>
        Author:
        <select
          value={author}
          onChange={this.handleAuthorChange}
          disabled={!!disabled}
        >
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
