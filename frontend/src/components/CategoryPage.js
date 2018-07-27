import React from "react";
import { Link } from "react-router-dom";
import PostList from "./PostList";

const CategoryPage = ({
  categoryPath,
  errorFetchingData,
  categories,
  postsFromCategory
}) => {
  const pageCategory =
    categories && categories.find(c => c.path === categoryPath);
  return (
    <div>
      {errorFetchingData && <div>Error: {errorFetchingData} </div>}
      <div>
        <h1>Category: {pageCategory && pageCategory.name}</h1>
        <div>
          <h2>Posts</h2>
          <PostList posts={postsFromCategory} />
        </div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default CategoryPage;
