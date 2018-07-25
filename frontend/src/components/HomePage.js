import React, { Component } from "react";

class HomePage extends Component {
  render() {
    const { isLoading, errorFetchingData, categories, posts } = this.props;

    return (
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
                  <li key={category.path}>{category.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Posts</h2>
              <ul>{posts.map(post => <li key={post.id}>{post.title}</li>)}</ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HomePage;
