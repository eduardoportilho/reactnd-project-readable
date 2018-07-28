import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Header, Segment, Button } from "semantic-ui-react";
import PageHeader from "./PageHeader";
import AuthorPicker from "./AuthorPicker";
import { getCategoryColor } from "../utils/users";

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

  handleCategoryChange = (event, data) => {
    this.setState({ categoryPath: data.value });
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
      errorFetchingData,
      errorSendingData,
      editedPost,
      categories
    } = this.props;

    const isEditingPost = editedPost !== undefined;
    const isSubmitDisabled = !this.isValidPost();
    const categoryOptions = categories.map(category => ({
      text: category.name,
      value: category.path,
      icon: {
        color: getCategoryColor(category.name),
        name: "tag"
      }
    }));

    return (
      <div>
        <PageHeader />
        <Container text style={{ marginTop: "7em" }}>
          {errorFetchingData && <div>Error: {errorFetchingData} </div>}
          {errorSendingData && <div>Error: {errorSendingData} </div>}

          <Segment>
            <Header as="h2">
              {isEditingPost ? "Editing Post" : "New Post"}
            </Header>

            <Form>
              <Form.Field>
                <label>Title</label>
                <input
                  placeholder="Post title"
                  value={title}
                  onChange={this.handleTitleChange}
                />
              </Form.Field>

              <Form.Group widths="equal">
                <AuthorPicker
                  author={author}
                  onAuthorChange={this.handleAuthorChange}
                />

                <Form.Select
                  label="Category"
                  placeholder="Select"
                  selection
                  value={categoryPath}
                  onChange={this.handleCategoryChange}
                  options={categoryOptions}
                />
              </Form.Group>

              <Form.TextArea
                label="Content"
                placeholder="What's in your head?"
                value={body}
                onChange={this.handleBodyChange}
              />

              <Button
                content={isEditingPost ? "Update Post" : "Add New Post"}
                onClick={this.handlePostSubmit}
                disabled={isSubmitDisabled}
                labelPosition="left"
                icon="edit"
                primary
              />

              {isEditingPost && (
                <Link to={`/${editedPost.category}/${editedPost.id}`}>
                  <Button
                    content="Cancel"
                    labelPosition="left"
                    icon="cancel"
                    secondary
                  />
                </Link>
              )}
            </Form>
          </Segment>
        </Container>
      </div>
    );
  }
}

export default EditPostPage;
