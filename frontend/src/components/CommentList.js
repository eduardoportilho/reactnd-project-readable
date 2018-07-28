import React, { Component } from "react";
import uuidv1 from "uuid/v1";
import { Comment, Header, Segment } from "semantic-ui-react";
import CommentContainer from "../containers/CommentContainer";
import EditComment from "./EditComment";

class CommentList extends Component {
  state = {
    editingCommentId: undefined
  };

  onCommentSave = (commentBody, commentAuthor) => {
    const { saveComment, postId } = this.props;
    return saveComment({
      id: uuidv1(),
      parentId: postId,
      timestamp: Date.now(),
      body: commentBody,
      author: commentAuthor
    });
  };

  onCommentEdit = comment =>
    this.setState({
      editingCommentId: comment.id
    });

  onCancelEdit = () =>
    this.setState({
      editingCommentId: undefined
    });

  onCommentUpdate = comment => (commentBody, commentAuthor) => {
    const { updateComment } = this.props;
    return updateComment(comment.id, {
      ...comment,
      timestamp: Date.now(),
      body: commentBody,
      author: commentAuthor
    }).then(() => {
      this.setState({
        editingCommentId: undefined
      });
    });
  };

  renderComments = () => {
    const { comments } = this.props;
    const { editingCommentId } = this.state;
    if (!comments.length) {
      return <div>None so far...</div>;
    }
    return (
      <div>
        {comments.map(
          comment =>
            comment.id === editingCommentId ? (
              <EditComment
                key={comment.id}
                editedComment={comment}
                onCommentSave={this.onCommentUpdate(comment)}
                onCancelEdit={this.onCancelEdit}
              />
            ) : (
              <CommentContainer
                key={comment.id}
                comment={comment}
                onCommentEdit={this.onCommentEdit}
              />
            )
        )}
      </div>
    );
  };

  render() {
    const { errorFetchingData, errorSendingData } = this.props;

    return (
      <Segment basic>
        {errorFetchingData && <div>Error: {errorFetchingData} </div>}
        {errorSendingData && <div>Error: {errorSendingData} </div>}
        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>

          {this.renderComments()}

          <EditComment onCommentSave={this.onCommentSave} />
        </Comment.Group>
      </Segment>
    );
  }
}

export default CommentList;
