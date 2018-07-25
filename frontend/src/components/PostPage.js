import React from "react";
import { Link } from "react-router-dom";

const PostPage = ({ isLoading, errorFetchingData, post }) => (
  <div>
    {errorFetchingData && <div>Error: {errorFetchingData} </div>}
    {isLoading || !post ? (
      <div>Loading...</div>
    ) : (
      <div>
        <h1>{post.title}</h1>
        <h2>by {post.author}</h2>
        <p>{post.body}</p>
        <p>{post.category}</p>
        <p>{post.voteScore}</p>
        <p>{post.timestamp}</p>
        <Link to="/">Home</Link>
      </div>
    )}
  </div>
);

export default PostPage;
