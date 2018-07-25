import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import uuidv1 from "uuid/v1";

const AUTHORS = [
  "Binx Bolling",
  "Patrick Bateman",
  "Inigo Montoya",
  "Jay Gatsby",
  "Benno van Archimboldi"
];

class NewPostPage extends Component {
  state = {
    title: "",
    body: "",
    author: AUTHORS[0],
    categoryPath: ""
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleAuthorChange = event => {
    this.setState({ author: event.target.value });
  };

  handleCategoryChange = event => {
    this.setState({ categoryPath: event.target.value });
  };

  handleBodyChange = event => {
    this.setState({ body: event.target.value });
  };

  handlePostSubmit = event => {
    event.preventDefault();
    const { title, body, author, categoryPath } = this.state;
    const { savePost } = this.props;
    savePost({
      id: uuidv1(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category: categoryPath
    });
  };

  render() {
    const { title, body, author, categoryPath } = this.state;
    const {
      isLoading,
      isSendingData,
      errorFetchingData,
      errorSendingData,
      isDataSendingCompleted,
      categories
    } = this.props;

    if (isDataSendingCompleted) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {errorFetchingData && <div>Error: {errorFetchingData} </div>}
        {errorSendingData && <div>Error: {errorSendingData} </div>}
        {isLoading || isSendingData ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1>New Post</h1>
            <form>
              <label>
                Title:
                <input
                  type="text"
                  value={title}
                  onChange={this.handleTitleChange}
                />
              </label>

              <label>
                Author:
                <select value={author} onChange={this.handleAuthorChange}>
                  {AUTHORS.map(anAuthor => (
                    <option key={anAuthor} value={anAuthor}>
                      {anAuthor}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Category:
                <select
                  value={categoryPath}
                  onChange={this.handleCategoryChange}
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {categories.map(aCategory => (
                    <option key={aCategory.path} value={aCategory.path}>
                      {aCategory.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Content:
                <textarea value={body} onChange={this.handleBodyChange} />
              </label>

              <input
                type="submit"
                value="Create"
                onClick={this.handlePostSubmit}
              />
            </form>
            <Link to="/">Home</Link>
          </div>
        )}
      </div>
    );
  }
}

export default NewPostPage;
