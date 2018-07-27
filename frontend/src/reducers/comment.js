import { POST_COMMENTS_FETCHED, COMMENT_SAVED, POST_DELETED } from "../actions";

const INITIAL_STATE = {
  postComments: []
};

function comment(state = INITIAL_STATE, action) {
  let postComments, comments;
  switch (action.type) {
    case POST_COMMENTS_FETCHED:
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
    case POST_DELETED:
      postComments = { ...state.postComments };
      delete postComments[action.postId];
      return {
        ...state,
        postComments
      };
    default:
      return state;
  }
}

export default comment;
