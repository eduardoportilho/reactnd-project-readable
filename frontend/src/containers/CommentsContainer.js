import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPostComments, saveComment, deleteComment } from "../actions";
import Comments from "../components/Comments";

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
      deleteComment
    } = this.props;

    if (!comments) {
      return <div>Loading...</div>;
    }

    return (
      <Comments
        errorFetchingData={errorFetchingData}
        errorSendingData={errorSendingData}
        postId={postId}
        comments={comments}
        saveComment={saveComment}
        deleteComment={deleteComment}
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
  deleteComment: commentId => dispatch(deleteComment(commentId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsContainer);
