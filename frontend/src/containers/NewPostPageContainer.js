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
      isDataSendingCompleted,
      categories,
      savePost
    } = this.props;

    const savePostWithGeneratedId = post => {
      savePost({
        id: uuidv1(),
        ...post
      });
    };

    return (
      <EditPostPage
        isLoading={isLoading}
        isSendingData={isSendingData}
        isDataSendingCompleted={isDataSendingCompleted}
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
  isDataSendingCompleted: state.postData.isDataSendingCompleted,
  categories: state.postData.categories
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  savePost: post => dispatch(savePost(post))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostPageContainer);
