import React from "react";

const CategoryPage = ({
  categoryPath,
  isLoading,
  errorFetchingData,
  categories,
  postsFromCategory
}) => (
  <div>
    {errorFetchingData && <div>Error: {errorFetchingData} </div>}
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <h1>Category: {categories.find(c => c.path === categoryPath).name}</h1>
        <div>
          <h2>Posts</h2>
          <ul>
            {postsFromCategory.map(post => <li key={post.id}>{post.title}</li>)}
          </ul>
        </div>
      </div>
    )}
  </div>
);

export default CategoryPage;
