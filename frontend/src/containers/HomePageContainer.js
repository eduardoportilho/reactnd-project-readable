import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllPosts } from "../actions";
import HomePage from "../components/HomePage";

class HomePageContainer extends Component {
  componentDidMount() {
    this.props.fetchAllPosts();
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
  fetchAllPosts: () => dispatch(fetchAllPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageContainer);
