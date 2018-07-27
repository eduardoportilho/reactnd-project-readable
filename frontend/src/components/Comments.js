import React, { Component } from "react";
import uuidv1 from "uuid/v1";
import NewComment from "./NewComment";

class Comments extends Component {
  onCommentSave = (commentBody, commentAuthor) => {
    const { saveComment, postId } = this.props;
    return saveComment({
      id: uuidv1(),
      parentId: postId,
      timestamp: Date.now(),
      body: commentBody,
      author: commentAuthor
    });
  };

  render() {
    const { errorFetchingData, errorSendingData, comments } = this.props;

    return (
      <div>
        {errorFetchingData && <div>Error: {errorFetchingData} </div>}
        {errorSendingData && <div>Error: {errorSendingData} </div>}
        <div>
          <h2>Comments:</h2>
          {comments.length ? (
            comments.map(comment => (
              <div key={comment.id}>
                <p>{comment.body}</p>
                <p>by {comment.author}</p>
                <p>at {comment.timestamp}</p>
                <p>Votes: {comment.voteScore}</p>
              </div>
            ))
          ) : (
            <div>None so far...</div>
          )}
          <NewComment onCommentSave={this.onCommentSave} />
        </div>
      </div>
    );
  }
}

export default Comments;
