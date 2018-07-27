import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllPosts } from "../actions";
import CategoryPage from "../components/CategoryPage";

class CategoryPageContainer extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
  }
  render() {
    const {
      match: {
        params: { categoryPath }
      },
      errorFetchingData,
      categories,
      postsFromCategory
    } = this.props;
    return (
      <CategoryPage
        categoryPath={categoryPath}
        errorFetchingData={errorFetchingData}
        categories={categories}
        postsFromCategory={postsFromCategory}
      />
    );
  }
}

const mapStateToProps = (
  state,
  {
    match: {
      params: { categoryPath }
    }
  }
) => ({
  errorFetchingData: state.postData.errorFetchingData,
  categories: state.postData.categories,
  postsFromCategory: state.postData.posts.filter(
    post => post.category === categoryPath
  )
});

const mapDispatchToProps = dispatch => ({
  fetchAllPosts: () => dispatch(fetchAllPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryPageContainer);
