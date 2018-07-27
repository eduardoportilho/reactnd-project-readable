import React, { Component } from "react";
import AuthorPicker from "./AuthorPicker";

const NOT_EMPTY_REGEXP = /[\w]+/gi;

class NewComment extends Component {
  state = {
    commentBody: "",
    commentAuthor: ""
  };

  handleCommentBodyChange = event => {
    this.setState({ commentBody: event.target.value });
  };

  handleCommentAuthorChange = commentAuthor => {
    this.setState({ commentAuthor });
  };

  handleCommentSubmit = event => {
    event.preventDefault();
    const { commentBody, commentAuthor } = this.state;
    const { onCommentSave } = this.props;
    onCommentSave(commentBody, commentAuthor).then(() =>
      this.setState({
        commentBody: "",
        commentAuthor: ""
      })
    );
  };

  isValidComment = () => {
    const { commentBody, commentAuthor } = this.state;
    return (
      commentBody &&
      commentBody.match(NOT_EMPTY_REGEXP) &&
      commentAuthor &&
      commentAuthor.match(NOT_EMPTY_REGEXP)
    );
  };

  render() {
    const { commentBody, commentAuthor } = this.state;
    const isSubmitDisabled = !this.isValidComment();
    return (
      <div>
        <form>
          <label>
            Add a new comment:
            <textarea
              value={commentBody}
              onChange={this.handleCommentBodyChange}
            />
          </label>

          <AuthorPicker
            author={commentAuthor}
            onAuthorChange={this.handleCommentAuthorChange}
          />
          <input
            type="submit"
            value="Comment"
            onClick={this.handleCommentSubmit}
            disabled={isSubmitDisabled}
          />
        </form>
      </div>
    );
  }
}

export default NewComment;
