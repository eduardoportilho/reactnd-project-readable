import React, { Component } from "react";
import { Link } from "react-router-dom";
import CommentsContainer from "../containers/CommentsContainer";

class PostPage extends Component {
  handleDeletePost = () => {
    const { post, deletePost } = this.props;
    deletePost(post.id);
  };

  render() {
    const { errorFetchingData, errorSendingData, post } = this.props;

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
          <p>Votes: {post.voteScore}</p>

          <CommentsContainer postId={post.id} />

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
