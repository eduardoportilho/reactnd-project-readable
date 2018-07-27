import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost, fetchCategories, updatePost } from "../actions";
import EditPostPage from "../components/EditPostPage";

class EditPostPageContainer extends Component {
  componentDidMount() {
    const {
      match: {
        params: { postId }
      },
      post,
      fetchPost
    } = this.props;
    this.props.fetchCategories();
    if (!post) {
      fetchPost(postId);
    }
  }

  render() {
    const {
      match: {
        params: { postId }
      },
      history,
      errorFetchingData,
      errorSendingData,
      categories,
      post,
      updatePost
    } = this.props;

    const updatePostWithId = updatedPost =>
      updatePost(postId, updatedPost).then(({ post }) => {
        history.push(`/post/${post.id}`);
      });

    // Using the "Fully uncontrolled component with a key" approach to reset the form content when the post is fetched.
    // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
    const pageKey = post ? post.id : "loading";

    return (
      <EditPostPage
        key={pageKey}
        errorFetchingData={errorFetchingData}
        errorSendingData={errorSendingData}
        categories={categories}
        editedPost={post}
        savePost={updatePostWithId}
      />
    );
  }
}

const mapStateToProps = (
  state,
  {
    match: {
      params: { postId }
    }
  }
) => ({
  errorFetchingData: state.common.errorFetchingData,
  errorSendingData: state.common.errorSendingData,
  post: state.post.posts.find(post => post.id === postId),
  categories: state.category.categories
});

const mapDispatchToProps = dispatch => ({
  fetchPost: postId => dispatch(fetchPost(postId)),
  fetchCategories: () => dispatch(fetchCategories()),
  updatePost: (postId, post) => dispatch(updatePost(postId, post))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPostPageContainer);
