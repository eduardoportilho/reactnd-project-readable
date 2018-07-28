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
      errorFetchingData,
      errorSendingData,
      categories,
      savePost,
      history
    } = this.props;

    const savePostWithGeneratedId = post =>
      savePost({
        id: uuidv1(),
        ...post
      }).then(({ post }) => {
        history.push(`/${post.category}/${post.id}`);
      });

    return (
      <EditPostPage
        errorFetchingData={errorFetchingData}
        errorSendingData={errorSendingData}
        categories={categories}
        savePost={savePostWithGeneratedId}
      />
    );
  }
}

const mapStateToProps = state => ({
  errorFetchingData: state.common.errorFetchingData,
  errorSendingData: state.common.errorSendingData,
  categories: state.category.categories
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  savePost: post => dispatch(savePost(post))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPostPageContainer);
