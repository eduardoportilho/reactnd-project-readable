import React from "react";
import moment from "moment";
import { Comment as CommentUI, Icon } from "semantic-ui-react";
import { getUserAvatarURL } from "../utils/users";

const Comment = ({
  comment,
  deleteComment,
  voteCommentUp,
  voteCommentDown,
  onCommentEdit
}) => (
  <CommentUI>
    <CommentUI.Avatar src={getUserAvatarURL(comment.author)} />
    <CommentUI.Content>
      <CommentUI.Author as="span">{comment.author}</CommentUI.Author>
      <CommentUI.Metadata>
        <div>{moment(comment.timestamp).format("MMMM Do YYYY, h:mm a")}</div>
      </CommentUI.Metadata>
      <CommentUI.Text>{comment.body}</CommentUI.Text>
      <CommentUI.Actions>
        <span>Vote score: {comment.voteScore}</span>
        <span className="inline-btns">
          <Icon
            link
            name="thumbs up outline"
            color="green"
            onClick={() => voteCommentUp(comment.id, comment.parentId)}
          />
          <Icon
            link
            name="thumbs down outline"
            color="red"
            onClick={() => voteCommentDown(comment.id, comment.parentId)}
          />
        </span>

        <span className="inline-btns">
          <Icon link name="edit" onClick={() => onCommentEdit(comment)} />
          <Icon link name="delete" onClick={() => deleteComment(comment.id)} />
        </span>
      </CommentUI.Actions>
    </CommentUI.Content>
  </CommentUI>
);

export default Comment;
