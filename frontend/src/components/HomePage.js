import React from "react";
import { Link } from "react-router-dom";

const HomePage = ({ isLoading, errorFetchingData, categories, posts }) => (
  <div>
    {errorFetchingData && <div>Error: {errorFetchingData} </div>}
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
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
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
  </div>
);

export default HomePage;
