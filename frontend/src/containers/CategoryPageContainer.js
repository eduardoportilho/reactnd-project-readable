import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPostsFromCategory } from "../actions";
import CategoryPage from "../components/CategoryPage";

class CategoryPageContainer extends Component {
  componentDidMount() {
    const {
      match: {
        params: { categoryPath }
      }
    } = this.props;
    this.props.fetchPostsFromCategory(categoryPath);
  }
  render() {
    const {
      match: {
        params: { categoryPath }
      },
      isLoading,
      errorFetchingData,
      categories,
      postsFromCategory
    } = this.props;
    return (
      <CategoryPage
        categoryPath={categoryPath}
        isLoading={isLoading}
        errorFetchingData={errorFetchingData}
        categories={categories}
        postsFromCategory={postsFromCategory}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.postData.isLoading,
  errorFetchingData: state.postData.errorFetchingData,
  categories: state.postData.categories,
  postsFromCategory: state.postData.postsFromCategory
});

const mapDispatchToProps = dispatch => ({
  fetchPostsFromCategory: categoryPath =>
    dispatch(fetchPostsFromCategory(categoryPath))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryPageContainer);
