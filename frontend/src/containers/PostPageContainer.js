import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost, saveComment } from "../actions";
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

  render() {
    const {
      match: {
        params: { postId }
      },
      isLoading,
      isSendingData,
      isDataSendingCompleted,
      errorFetchingData,
      errorSendingData,
      post,
      comments,
      saveComment,
      fetchPost
    } = this.props;

    // Comment saved, update post data
    if (isDataSendingCompleted) {
      fetchPost(postId);
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
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.postData.isLoading,
  isSendingData: state.postData.isSendingData,
  isDataSendingCompleted: state.postData.isDataSendingCompleted,
  errorFetchingData: state.postData.errorFetchingData,
  errorSendingData: state.postData.errorSendingData,
  post: state.postData.post,
  comments: state.postData.comments
});

const mapDispatchToProps = dispatch => ({
  fetchPost: postId => dispatch(fetchPost(postId)),
  saveComment: comment => dispatch(saveComment(comment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageContainer);
