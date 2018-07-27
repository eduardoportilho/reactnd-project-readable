import React, { Component } from "react";
import AuthorPicker from "./AuthorPicker";

const NOT_EMPTY_REGEXP = /[\w]+/gi;

class EditComment extends Component {
  state = {
    commentBody: this.props.editedComment ? this.props.editedComment.body : "",
    commentAuthor: this.props.editedComment
      ? this.props.editedComment.author
      : ""
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
    const { onCommentSave, editedComment } = this.props;
    const isEditingComment = editedComment !== undefined;
    onCommentSave(commentBody, commentAuthor).then(() => {
      if (!isEditingComment) {
        this.setState({
          commentBody: "",
          commentAuthor: ""
        });
      }
    });
  };
  handleCancelEdit = event => {
    event.preventDefault();
    this.props.onCancelEdit();
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
    const { editedComment } = this.props;
    const isSubmitDisabled = !this.isValidComment();
    const isEditingComment = editedComment !== undefined;
    return (
      <div>
        <form>
          <label>
            {isEditingComment ? "Edit Comment:" : "Add a new comment:"}
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
            value={isEditingComment ? "Update" : "Comment"}
            onClick={this.handleCommentSubmit}
            disabled={isSubmitDisabled}
          />
          {isEditingComment && (
            <button onClick={this.handleCancelEdit}>Cancel</button>
          )}
        </form>
      </div>
    );
  }
}

export default EditComment;
