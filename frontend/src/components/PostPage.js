import React from "react";
import { Link } from "react-router-dom";

const PostPage = ({ isLoading, errorFetchingData, post, comments }) => (
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
          {comments.map(comment => (
            <div>
              <p>{comment.body}</p>
              <p>by {comment.author}</p>
              <p>at {comment.timestamp}</p>
              <p>Votes: {comment.voteScore}</p>
            </div>
          ))}
        </div>
        <Link to="/">Home</Link>
      </div>
    )}
  </div>
);

export default PostPage;
