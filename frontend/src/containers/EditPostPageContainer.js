import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost, updatePost } from "../actions";
import EditPostPage from "../components/EditPostPage";

class EditPostPageContainer extends Component {
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
      errorFetchingData,
      errorSendingData,
      isDataSendingCompleted,
      categories,
      post,
      updatePost
    } = this.props;

    const updatePostWithId = updatedPost => updatePost(postId, updatedPost);

    // Using the "Fully uncontrolled component with a key" approach to reset the form content when the post is fetched.
    // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
    const pageKey = post ? post.id : "loading";

    return (
      <EditPostPage
        key={pageKey}
        isLoading={isLoading}
        isSendingData={isSendingData}
        isDataSendingCompleted={isDataSendingCompleted}
        errorFetchingData={errorFetchingData}
        errorSendingData={errorSendingData}
        categories={categories}
        editedPost={post}
        savePost={updatePostWithId}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.postData.isLoading,
  isSendingData: state.postData.isSendingData,
  errorFetchingData: state.postData.errorFetchingData,
  errorSendingData: state.postData.errorSendingData,
  isDataSendingCompleted: state.postData.isDataSendingCompleted,
  post: state.postData.post,
  categories: state.postData.categories
});

const mapDispatchToProps = dispatch => ({
  fetchPost: postId => dispatch(fetchPost(postId)),
  updatePost: (postId, post) => dispatch(updatePost(postId, post))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostPageContainer);
