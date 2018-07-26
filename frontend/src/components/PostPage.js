import React, { Component } from "react";
import { Link } from "react-router-dom";
import uuidv1 from "uuid/v1";
import AuthorPicker from "./AuthorPicker";

class PostPage extends Component {
  state = {
    commentBody: "",
    commentAuthor: ""
  };

  handleCommentBodyChange = event => {
    this.setState({ commentBody: event.target.value });
  };

  handleCommentAuthorChange = commentAuthor => {
    this.setState({ commentAuthor });
  };

  handleCommentSubmit = event => {
    event.preventDefault();
    const { commentBody, commentAuthor } = this.state;
    const { saveComment, post } = this.props;
    saveComment({
      parentId: post.id,
      id: uuidv1(),
      timestamp: Date.now(),
      body: commentBody,
      author: commentAuthor
    });
    this.setState({
      commentBody: "",
      commentAuthor: ""
    });
  };

  render() {
    const { isLoading, errorFetchingData, post, comments } = this.props;
    const { commentBody } = this.state;
    return (
      <div>
        {errorFetchingData && <div>Error: {errorFetchingData} </div>}
        {isLoading || !post ? (
          <div>Loading...</div>
        ) : (
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
              <div>
                <form>
                  <label>
                    Add a new comment:
                    <textarea
                      value={commentBody}
                      onChange={this.handleCommentBodyChange}
                    />
                  </label>

                  <AuthorPicker
                    onAuthorChange={this.handleCommentAuthorChange}
                  />
                  <input
                    type="submit"
                    value="Comment"
                    onClick={this.handleCommentSubmit}
                  />
                </form>
              </div>
            </div>
            <hr />
            <Link to="/">Home</Link>
            <Link to={`/edit-post/${post.id}`}>Edit</Link>
          </div>
        )}
      </div>
    );
  }
}

export default PostPage;
