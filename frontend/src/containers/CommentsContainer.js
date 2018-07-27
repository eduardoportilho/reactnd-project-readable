import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPostComments, saveComment } from "../actions";
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
      saveComment
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
      />
    );
  }
}

const mapStateToProps = (state, { postId }) => ({
  errorFetchingData: state.postData.errorFetchingData,
  errorSendingData: state.postData.errorSendingData,
  comments: state.postData.postComments[postId]
});

const mapDispatchToProps = dispatch => ({
  fetchPostComments: postId => dispatch(fetchPostComments(postId)),
  saveComment: comment => dispatch(saveComment(comment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsContainer);
