import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Segment, Dropdown, Header, Menu } from "semantic-ui-react";

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
    const { posts, votePostUp, votePostDown } = this.props;
    const { sortField } = this.state;
    const sortedPosts = _.sortBy(posts, sortField).reverse();
    return (
      <div>
        <Menu secondary attached="top">
          <Menu.Item header>
            <Header as="h2">Posts</Header>
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
          <ul>
            {sortedPosts.map(post => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
                <span>{post.commentCount} comments</span>
                <span>
                  Vote Score: {post.voteScore}
                  <button onClick={() => votePostUp(post.id)}>Vote Up</button>
                  <button onClick={() => votePostDown(post.id)}>
                    Vote Down
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </Segment>
      </div>
    );
  }
}

export default PostList;
