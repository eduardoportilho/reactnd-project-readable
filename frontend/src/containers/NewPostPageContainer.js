import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid/v1";
import { fetchCategories, savePost } from "../actions";
import EditPostPage from "../components/EditPostPage";

class NewPostPageContainer extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const {
      isLoading,
      isSendingData,
      errorFetchingData,
      errorSendingData,
      categories,
      savePost,
      savedPost
    } = this.props;

    const savePostWithGeneratedId = post => {
      savePost({
        id: uuidv1(),
        ...post
      });
    };
    const isEditCompleted = savedPost !== undefined;
    return (
      <EditPostPage
        isLoading={isLoading}
        isSendingData={isSendingData}
        isEditCompleted={isEditCompleted}
        errorFetchingData={errorFetchingData}
        errorSendingData={errorSendingData}
        categories={categories}
        savePost={savePostWithGeneratedId}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.postData.isLoading,
  isSendingData: state.postData.isSendingData,
  errorFetchingData: state.postData.errorFetchingData,
  errorSendingData: state.postData.errorSendingData,
  categories: state.postData.categories,
  savedPost: state.postData.savedPost
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  savePost: post => dispatch(savePost(post))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostPageContainer);
