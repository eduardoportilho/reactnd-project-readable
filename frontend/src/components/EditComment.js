import React, { Component } from "react";
import { Form, Button, Header, Segment } from "semantic-ui-react";
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
      <Segment>
        <Header as="h4">
          {isEditingComment ? "Editing Comment" : "New Comment"}
        </Header>

        <Form reply>
          <Form.TextArea
            label="Comment"
            value={commentBody}
            onChange={this.handleCommentBodyChange}
          />

          <Form.Group>
            <AuthorPicker
              author={commentAuthor}
              onAuthorChange={this.handleCommentAuthorChange}
            />
          </Form.Group>

          <Button
            content={isEditingComment ? "Update Comment" : "Add Comment"}
            onClick={this.handleCommentSubmit}
            disabled={isSubmitDisabled}
            labelPosition="left"
            icon="edit"
            primary
          />

          {isEditingComment && (
            <Button
              content="Cancel"
              onClick={this.handleCancelEdit}
              labelPosition="left"
              icon="cancel"
              secondary
            />
          )}
        </Form>
      </Segment>
    );
  }
}

export default EditComment;
