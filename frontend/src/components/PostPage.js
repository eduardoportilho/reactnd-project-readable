import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Label, Image, Card } from "semantic-ui-react";
import moment from "moment";
import PageHeader from "./PageHeader";
import CommentListContainer from "../containers/CommentListContainer";
import { getUserAvatarURL } from "../utils/users";
import PostControls from "./PostControls";

class PostPage extends Component {
  handleDeletePost = () => {
    const { post, deletePost } = this.props;
    deletePost(post.id);
  };

  render() {
    const {
      errorFetchingData,
      errorSendingData,
      post,
      votePostUp,
      votePostDown
    } = this.props;

    return (
      <div>
        <PageHeader />
        <Container text style={{ marginTop: "7em" }}>
          {errorFetchingData && <div>Error: {errorFetchingData} </div>}
          {errorSendingData && <div>Error: {errorSendingData} </div>}

          <Card fluid>
            <Card.Content>
              <Card.Header>{post.title}</Card.Header>
              <Card.Meta>
                by{" "}
                <Label image>
                  <Image
                    avatar
                    className="label-on-meta-fix"
                    src={getUserAvatarURL(post.author)}
                  />
                  {post.author}
                </Label>{" "}
                at {moment(post.timestamp).format("MMMM Do YYYY, h:mm a")}
              </Card.Meta>
            </Card.Content>

            <Card.Content>
              <Card.Description>{post.body}</Card.Description>
            </Card.Content>

            <Card.Content extra>
              <PostControls
                post={post}
                votePostUp={votePostUp}
                votePostDown={votePostDown}
                deletePost={this.handleDeletePost}
                showEditControls
              />
            </Card.Content>
          </Card>

          <CommentListContainer postId={post.id} />
        </Container>
      </div>
    );
  }
}

export default PostPage;
