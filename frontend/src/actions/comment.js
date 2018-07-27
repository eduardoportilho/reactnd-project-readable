import { getPostComments, addComment } from "../utils/PostsAPI";
import { errorFetchingData, errorSendingData } from ".";

export const POST_COMMENTS_FETCHED = "POST_COMMENTS_FETCHED";
function postCommentsFetched(postId, comments) {
  return {
    type: POST_COMMENTS_FETCHED,
    postId,
    comments
  };
}

export const COMMENT_SAVED = "COMMENT_SAVED";
function commentSaved(comment) {
  return {
    type: COMMENT_SAVED,
    comment
  };
}
export const fetchPostComments = postId => dispatch =>
  getPostComments(postId)
    .then(comments => dispatch(postCommentsFetched(postId, comments)))
    .catch(error => dispatch(errorFetchingData(error)));

export const saveComment = comment => dispatch =>
  addComment(comment)
    .then(comment => dispatch(commentSaved(comment)))
    .catch(error => dispatch(errorSendingData(error)));
