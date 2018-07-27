import React from "react";

const Comment = ({
  comment,
  deleteComment,
  voteCommentUp,
  voteCommentDown,
  onCommentEdit
}) => (
  <div>
    <p>{comment.body}</p>
    <p>by {comment.author}</p>
    <p>at {comment.timestamp}</p>

    <div>
      <h2>Score:</h2>
      <p>Vote Score: {comment.voteScore}</p>

      <button onClick={() => voteCommentUp(comment.id, comment.parentId)}>
        Vote Up
      </button>

      <button onClick={() => voteCommentDown(comment.id, comment.parentId)}>
        Vote Down
      </button>
    </div>

    <button onClick={() => deleteComment(comment.id)}>Delete</button>
    <button onClick={() => onCommentEdit(comment)}>Edit</button>
  </div>
);

export default Comment;
