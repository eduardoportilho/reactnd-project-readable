import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCategories, savePost } from "../actions";
import NewPostPage from "../components/NewPostPage";

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
    return (
      <NewPostPage
        isLoading={isLoading}
        isSendingData={isSendingData}
        isDataSendingCompleted={isDataSendingCompleted}
        errorFetchingData={errorFetchingData}
        errorSendingData={errorSendingData}
        categories={categories}
        savePost={savePost}
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
