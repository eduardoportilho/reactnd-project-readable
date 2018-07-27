import React from "react";
import { Link } from "react-router-dom";
import PostListContainer from "../containers/PostListContainer";

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
          <PostListContainer posts={postsFromCategory} />
        </div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default CategoryPage;
