import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthorPicker from "./AuthorPicker";

const NOT_EMPTY_REGEXP = /[\w]+/gi;

class EditPostPage extends Component {
  state = {
    title: this.props.editedPost ? this.props.editedPost.title : "",
    body: this.props.editedPost ? this.props.editedPost.body : "",
    author: this.props.editedPost ? this.props.editedPost.author : "",
    categoryPath: this.props.editedPost ? this.props.editedPost.category : ""
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleAuthorChange = author => {
    this.setState({ author });
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
      timestamp: Date.now(),
      title,
      body,
      author,
      category: categoryPath
    });
  };

  isValidPost = () => {
    const { title, body, author, categoryPath } = this.state;
    return (
      title &&
      title.match(NOT_EMPTY_REGEXP) &&
      body &&
      body.match(NOT_EMPTY_REGEXP) &&
      author &&
      author.match(NOT_EMPTY_REGEXP) &&
      categoryPath &&
      categoryPath.match(NOT_EMPTY_REGEXP)
    );
  };

  render() {
    const { title, body, author, categoryPath } = this.state;
    const {
      isLoading,
      isSendingData,
      errorFetchingData,
      errorSendingData,
      editedPost,
      categories
    } = this.props;

    if (isLoading || isSendingData) {
      return <div>Loading...</div>;
    }

    const isEditingPost = editedPost !== undefined;
    const isSubmitDisabled = !this.isValidPost();

    return (
      <div>
        {errorFetchingData && <div>Error: {errorFetchingData} </div>}
        {errorSendingData && <div>Error: {errorSendingData} </div>}
        <div>
          <h1>{isEditingPost ? "Edit Post" : "New Post"}</h1>
          <form>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={this.handleTitleChange}
              />
            </label>

            <AuthorPicker
              defaultValue={author}
              onAuthorChange={this.handleAuthorChange}
            />

            <label>
              Category:
              <select value={categoryPath} onChange={this.handleCategoryChange}>
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
              value={isEditingPost ? "Update" : "Create"}
              onClick={this.handlePostSubmit}
              disabled={isSubmitDisabled}
            />
          </form>
          <Link to="/">Home</Link>
        </div>
      </div>
    );
  }
}

export default EditPostPage;
