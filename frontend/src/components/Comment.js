import React from "react";

const Comment = ({ comment, onCommentDelete, onCommentEdit }) => (
  <div>
    <p>{comment.body}</p>
    <p>by {comment.author}</p>
    <p>at {comment.timestamp}</p>
    <p>Votes: {comment.voteScore}</p>
    <button onClick={() => onCommentDelete(comment.id)}>Delete</button>
    <button onClick={() => onCommentEdit(comment)}>Edit</button>
  </div>
);

export default Comment;
