import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthorPicker from "./AuthorPicker";

class EditPostPage extends Component {
  state = {
    title: this.props.editedPost ? this.props.editedPost.title : "",
    body: this.props.editedPost ? this.props.editedPost.body : "",
    author: this.props.editedPost ? this.props.editedPost.author : "",
    categoryPath: this.props.editedPost
      ? this.props.editedPost.category.path
      : ""
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

  render() {
    const { title, body, author, categoryPath } = this.state;
    const {
      isLoading,
      isSendingData,
      errorFetchingData,
      errorSendingData,
      isDataSendingCompleted,
      editedPost,
      categories
    } = this.props;

    if (isDataSendingCompleted) {
      return <Redirect to="/" />;
    }

    const isEditingPost = editedPost !== undefined;

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

              <AuthorPicker
                defaultValue={author}
                onAuthorChange={this.handleAuthorChange}
                disabled={isEditingPost}
              />

              <label>
                Category:
                <select
                  value={categoryPath}
                  onChange={this.handleCategoryChange}
                  disabled={isEditingPost}
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
                value={isEditingPost ? "Update" : "Create"}
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

export default EditPostPage;