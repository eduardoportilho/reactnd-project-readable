import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import {
  Segment,
  Dropdown,
  Header,
  Menu,
  List,
  Image
} from "semantic-ui-react";
import { getUserAvatarURL } from "../utils/users";
import PostControls from "./PostControls";

const SORT_OPTIONS = [
  {
    text: "Title",
    value: "title"
  },
  {
    text: "Vote Score",
    value: "voteScore"
  },
  {
    text: "Creation time",
    value: "timestamp"
  }
];

class PostList extends Component {
  state = {
    sortField: SORT_OPTIONS[0].value
  };

  handleSortByChange = (event, data) => {
    this.setState({ sortField: data.value });
  };
  render() {
    const { posts, votePostUp, votePostDown, deletePost, title } = this.props;
    const { sortField } = this.state;
    const sortedPosts = _.sortBy(posts, sortField).reverse();
    return (
      <div>
        <Menu secondary attached="top">
          <Menu.Item header>
            <Header as="h2">{title || "All Posts"}</Header>
          </Menu.Item>

          <Menu.Item position="right">
            Sort by{" "}
            <Dropdown
              inline
              className="inline-margin"
              options={SORT_OPTIONS}
              placeholder="..."
              value={sortField}
              onChange={this.handleSortByChange}
            />
          </Menu.Item>
        </Menu>
        <Segment attached>
          <List>
            {!sortedPosts.length && (
              <Header as="h4" disabled>
                Nothing to see here..
              </Header>
            )}
            {sortedPosts.map(post => (
              <List.Item key={post.id}>
                <Image avatar src={getUserAvatarURL(post.author)} />
                <List.Content>
                  <List.Header>
                    <Link to={`/${post.category}/${post.id}`}>
                      {post.title}
                    </Link>
                    <span className="post-list-author"> by {post.author}</span>
                  </List.Header>
                  <List.Description>
                    <PostControls
                      post={post}
                      votePostUp={votePostUp}
                      votePostDown={votePostDown}
                      deletePost={() => deletePost(post.id)}
                      showEditControls
                    />
                  </List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      </div>
    );
  }
}

export default PostList;
