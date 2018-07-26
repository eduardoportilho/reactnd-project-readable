import React from "react";
import { Link } from "react-router-dom";
import PostList from "./PostList";

const HomePage = ({ isLoading, errorFetchingData, categories, posts }) => (
  <div>
    {errorFetchingData && <div>Error: {errorFetchingData} </div>}
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <h1>Readable</h1>
        <Link to="/new-post">New post</Link>
        <div>
          <h2>Categories</h2>
          <ul>
            {categories.map(category => (
              <li key={category.path}>
                <Link to={`/category/${category.path}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Posts</h2>
          <PostList posts={posts} />
        </div>
      </div>
    )}
  </div>
);

export default HomePage;
