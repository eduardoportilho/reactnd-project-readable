import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchPost, deletePost, saveComment } from "../actions";
import PostPage from "../components/PostPage";

class HomePageContainer extends Component {
  componentDidMount() {
    const {
      match: {
        params: { postId }
      },
      fetchPost
    } = this.props;
    fetchPost(postId);
  }

  componentDidUpdate = prevProps => {
    const {
      match: {
        params: { postId }
      },
      fetchPost,
      savedComment
    } = this.props;

    // Comment saved, update post data
    if (savedComment && !prevProps.savedComment) {
      fetchPost(postId);
    }
  };

  render() {
    const {
      isLoading,
      isSendingData,
      errorFetchingData,
      errorSendingData,
      post,
      comments,
      saveComment,
      deletePost,
      isPostDeleted
    } = this.props;

    if (isPostDeleted) {
      return <Redirect to="/" />;
    }

    return (
      <PostPage
        isLoading={isLoading}
        isSendingData={isSendingData}
        errorFetchingData={errorFetchingData}
        errorSendingData={errorSendingData}
        post={post}
        comments={comments}
        saveComment={saveComment}
        deletePost={deletePost}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.postData.isLoading,
  isSendingData: state.postData.isSendingData,
  errorFetchingData: state.postData.errorFetchingData,
  errorSendingData: state.postData.errorSendingData,
  post: state.postData.post,
  comments: state.postData.comments,
  savedComment: state.postData.savedComment,
  isPostDeleted: state.postData.isPostDeleted
});

const mapDispatchToProps = dispatch => ({
  fetchPost: postId => dispatch(fetchPost(postId)),
  deletePost: postId => dispatch(deletePost(postId)),
  saveComment: comment => dispatch(saveComment(comment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageContainer);
