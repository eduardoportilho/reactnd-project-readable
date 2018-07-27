import React, { Component } from "react";
import { Link } from "react-router-dom";
import CommentListContainer from "../containers/CommentListContainer";

class PostPage extends Component {
  handleDeletePost = () => {
    const { post, deletePost } = this.props;
    deletePost(post.id);
  };

  render() {
    const {
      errorFetchingData,
      errorSendingData,
      post,
      votePostUp,
      votePostDown
    } = this.props;

    return (
      <div>
        {errorFetchingData && <div>Error: {errorFetchingData} </div>}
        {errorSendingData && <div>Error: {errorSendingData} </div>}
        <div>
          <h1>{post.title}</h1>
          <p>by {post.author}</p>
          <p>at {post.timestamp}</p>
          <p>{post.commentCount} comments</p>
          <p>{post.body}</p>
          <p>Category: {post.category}</p>
          <div>
            <h2>Score:</h2>
            <p>Vote Score: {post.voteScore}</p>

            <button onClick={() => votePostUp(post.id)}>Vote Up</button>

            <button onClick={() => votePostDown(post.id)}>Vote Down</button>
          </div>

          <CommentListContainer postId={post.id} />

          <hr />

          <Link to="/">Home</Link>
          <Link to={`/edit-post/${post.id}`}>Edit</Link>
          <button onClick={this.handleDeletePost}>Delete</button>
        </div>
      </div>
    );
  }
}

export default PostPage;
