import React from "react";
import { Link } from "react-router-dom";

const CategoryPage = ({
  categoryPath,
  isLoading,
  errorFetchingData,
  categories,
  postsFromCategory
}) => {
  const pageCategory =
    categories && categories.find(c => c.path === categoryPath);
  return (
    <div>
      {errorFetchingData && <div>Error: {errorFetchingData} </div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Category: {pageCategory && pageCategory.name}</h1>
          <div>
            <h2>Posts</h2>
            <ul>
              {postsFromCategory.map(post => (
                <li key={post.id}>
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/">Home</Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
