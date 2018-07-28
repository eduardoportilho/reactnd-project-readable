import React from "react";
import { List, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getCategoryColor } from "../utils/users";

const PostControls = ({
  post,
  votePostUp,
  votePostDown,
  showEditControls,
  deletePost
}) => (
  <div>
    <List horizontal relaxed>
      <List.Item>
        <Link to={`/${post.category}`}>
          <Label color={getCategoryColor(post.category)} tag size="mini">
            {post.category}
          </Label>
        </Link>
      </List.Item>
      <List.Item>{post.commentCount} comments</List.Item>
      <List.Item>
        <span>Vote score: {post.voteScore}</span>
        <span className="inline-btns">
          <Icon
            link
            name="thumbs up outline"
            color="green"
            onClick={() => votePostUp(post.id)}
          />
          <Icon
            link
            name="thumbs down outline"
            color="red"
            onClick={() => votePostDown(post.id)}
          />
        </span>
      </List.Item>
    </List>
    {showEditControls && (
      <List floated="right" horizontal>
        <List.Item>
          <Link to={`/edit-post/${post.id}`}>
            <Icon className="inline-btns" link name="edit" />
          </Link>
        </List.Item>
        <List.Item>
          <Icon link name="delete" onClick={deletePost} />
        </List.Item>
      </List>
    )}
  </div>
);

export default PostControls;
