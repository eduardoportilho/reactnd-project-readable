import React, { Component } from "react";

class HomePage extends Component {
  render() {
    const { isLoading, errorFetchingData, categories } = this.props;

    return (
      <div>
        {errorFetchingData && <div>Error: {errorFetchingData} </div>}
        <div>
          <h2>Categories</h2>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <ul>
              {categories.map(category => (
                <li key={category.path}>{category.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default HomePage;
