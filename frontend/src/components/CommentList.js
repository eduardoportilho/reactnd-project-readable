import React, { Component } from "react";
import uuidv1 from "uuid/v1";
import Comment from "./Comment";
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

  onCommentDelete = commentId => this.props.deleteComment(commentId);

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
    const { comments, deleteComment } = this.props;
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
              <Comment
                key={comment.id}
                comment={comment}
                onCommentDelete={deleteComment}
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
      <div>
        {errorFetchingData && <div>Error: {errorFetchingData} </div>}
        {errorSendingData && <div>Error: {errorSendingData} </div>}
        <div>
          <h2>Comments:</h2>
          {this.renderComments()}
          <EditComment onCommentSave={this.onCommentSave} />
        </div>
      </div>
    );
  }
}

export default CommentList;
