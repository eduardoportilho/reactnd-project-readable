import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost, deletePost, votePostUp, votePostDown } from "../actions";
import PostPage from "../components/PostPage";

class PostPageContainer extends Component {
  componentDidMount() {
    const {
      match: {
        params: { postId }
      },
      post,
      fetchPost
    } = this.props;
    if (!post) {
      fetchPost(postId);
    }
  }

  render() {
    const {
      errorFetchingData,
      errorSendingData,
      post,
      deletePost,
      votePostUp,
      votePostDown,
      history
    } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    const deleteAndRedirect = postId =>
      deletePost(postId).then(() => history.push("/"));

    return (
      <PostPage
        errorFetchingData={errorFetchingData}
        errorSendingData={errorSendingData}
        post={post}
        deletePost={deleteAndRedirect}
        votePostUp={votePostUp}
        votePostDown={votePostDown}
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
  post: state.post.posts.find(post => post.id === postId)
});

const mapDispatchToProps = dispatch => ({
  fetchPost: postId => dispatch(fetchPost(postId)),
  deletePost: postId => dispatch(deletePost(postId)),
  votePostUp: postId => dispatch(votePostUp(postId)),
  votePostDown: postId => dispatch(votePostDown(postId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPageContainer);
