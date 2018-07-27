import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts, fetchCategories } from "../actions";
import HomePage from "../components/HomePage";

class HomePageContainer extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  render() {
    const { errorFetchingData, categories, posts } = this.props;
    return (
      <HomePage
        errorFetchingData={errorFetchingData}
        categories={categories}
        posts={posts}
      />
    );
  }
}

const mapStateToProps = state => ({
  errorFetchingData: state.common.errorFetchingData,
  categories: state.category.categories,
  posts: state.post.posts
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageContainer);
