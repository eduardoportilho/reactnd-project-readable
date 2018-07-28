import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { USERS } from "../utils/users";

const AUTHORS = USERS.map(user => ({
  text: user.name,
  value: user.name,
  image: { avatar: true, src: user.avatar }
}));

class AuthorPicker extends Component {
  handleAuthorChange = (event, data) => {
    const { onAuthorChange } = this.props;
    const author = data.value;
    this.setState({ author: author }, () => onAuthorChange(author));
  };

  render() {
    const { disabled, author } = this.props;
    return (
      <Form.Select
        label="Author"
        placeholder="Select"
        selection
        value={author}
        onChange={this.handleAuthorChange}
        disabled={!!disabled}
        options={AUTHORS}
      />
    );
  }
}

export default AuthorPicker;
