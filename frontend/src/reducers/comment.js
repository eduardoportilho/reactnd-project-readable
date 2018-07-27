import {
  COMMENTS_FETCHED,
  COMMENT_SAVED,
  COMMENT_DELETED,
  POST_DELETED,
  COMMENT_UPDATED
} from "../actions";

const INITIAL_STATE = {
  postComments: []
};

function comment(state = INITIAL_STATE, action) {
  let postComments, comments;
  switch (action.type) {
    case COMMENTS_FETCHED:
      postComments = { ...state.postComments };
      postComments[action.postId] = action.comments;
      return {
        ...state,
        postComments
      };
    case COMMENT_SAVED:
      postComments = { ...state.postComments };
      comments = postComments[action.comment.parentId] || [];
      postComments[action.comment.parentId] = [...comments, action.comment];
      return {
        ...state,
        postComments
      };
    case COMMENT_DELETED:
      postComments = { ...state.postComments };
      comments = postComments[action.postId].filter(
        comment => comment.id !== action.commentId
      );
      postComments[action.postId] = comments;
      return {
        ...state,
        postComments
      };
    case POST_DELETED:
      postComments = { ...state.postComments };
      delete postComments[action.postId];
      return {
        ...state,
        postComments
      };
    case COMMENT_UPDATED:
      postComments = { ...state.postComments };
      comments = postComments[action.comment.parentId].map(
        comment => (comment.id === action.comment.id ? action.comment : comment)
      );
      postComments[action.comment.parentId] = comments;
      return {
        ...state,
        postComments
      };
    default:
      return state;
  }
}

export default comment;
