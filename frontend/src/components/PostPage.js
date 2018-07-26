import React, { Component } from "react";
import { Link } from "react-router-dom";
import uuidv1 from "uuid/v1";
import NewComment from "./NewComment";

class PostPage extends Component {
  onCommentSave = (commentBody, commentAuthor) => {
    const { saveComment, post } = this.props;
    saveComment({
      parentId: post.id,
      id: uuidv1(),
      timestamp: Date.now(),
      body: commentBody,
      author: commentAuthor
    });
  };

  handleDeletePost = () => {
    const { post, deletePost } = this.props;
    deletePost(post.id);
  };

  render() {
    const {
      isLoading,
      isSendingData,
      isCommentSaved,
      errorFetchingData,
      errorSendingData,
      post,
      comments
    } = this.props;

    if (isLoading || isSendingData || !post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {errorFetchingData && <div>Error: {errorFetchingData} </div>}
        {errorSendingData && <div>Error: {errorSendingData} </div>}
        <div>
          <h1>{post.title}</h1>
          <p>by {post.author}</p>
          <p>at {post.timestamp}</p>
          <p>{post.body}</p>
          <p>Category: {post.category}</p>
          <p>Votes: {post.voteScore}</p>
          <div>
            <h2>Comments:</h2>
            {comments.length ? (
              comments.map(comment => (
                <div key={comment.id}>
                  <p>{comment.body}</p>
                  <p>by {comment.author}</p>
                  <p>at {comment.timestamp}</p>
                  <p>Votes: {comment.voteScore}</p>
                </div>
              ))
            ) : (
              <div>None so far...</div>
            )}
            <NewComment
              onCommentSave={this.onCommentSave}
              resetCommentData={isCommentSaved}
            />
          </div>
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
