import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchPostComments,
  saveComment,
  deleteComment,
  updateComment
} from "../actions";
import CommentList from "../components/CommentList";

class CommentsContainer extends Component {
  componentDidMount() {
    const { postId, comments, fetchPostComments } = this.props;
    if (!comments) {
      fetchPostComments(postId);
    }
  }

  render() {
    const {
      errorFetchingData,
      errorSendingData,
      postId,
      comments,
      saveComment,
      deleteComment,
      updateComment
    } = this.props;

    if (!comments) {
      return <div>Loading...</div>;
    }

    return (
      <CommentList
        errorFetchingData={errorFetchingData}
        errorSendingData={errorSendingData}
        postId={postId}
        comments={comments}
        saveComment={saveComment}
        deleteComment={deleteComment}
        updateComment={updateComment}
      />
    );
  }
}

const mapStateToProps = (state, { postId }) => ({
  errorFetchingData: state.common.errorFetchingData,
  errorSendingData: state.common.errorSendingData,
  comments: state.comment.postComments[postId]
});

const mapDispatchToProps = dispatch => ({
  fetchPostComments: postId => dispatch(fetchPostComments(postId)),
  saveComment: comment => dispatch(saveComment(comment)),
  deleteComment: commentId => dispatch(deleteComment(commentId)),
  updateComment: (id, comment) => dispatch(updateComment(id, comment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsContainer);
