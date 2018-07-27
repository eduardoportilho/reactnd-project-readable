import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

const SORT_OPTIONS = [
  {
    label: "Title",
    key: "title"
  },
  {
    label: "Vote Score",
    key: "voteScore"
  },
  {
    label: "Creation time",
    key: "timestamp"
  }
];

class PostList extends Component {
  state = {
    sortedPosts: [],
    sortBy: ""
  };

  handleSortByChange = event => {
    const sortKey = event.target.value;
    const { posts } = this.props;
    this.setState({
      sortBy: sortKey,
      sortedPosts: _.sortBy(posts, sortKey)
    });
  };

  render() {
    const { posts } = this.props;
    const { sortBy, sortedPosts } = this.state;
    const displayPosts = sortedPosts.length ? sortedPosts : posts;
    return (
      <div>
        <label>
          Sort by:
          <select value={sortBy} onChange={this.handleSortByChange}>
            <option value="" disabled>
              Select one
            </option>
            {SORT_OPTIONS.map(sortOption => (
              <option key={sortOption.key} value={sortOption.key}>
                {sortOption.label}
              </option>
            ))}
          </select>
        </label>
        <ul>
          {displayPosts.map(post => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PostList;
