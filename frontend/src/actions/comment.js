import {
  getPostComments,
  addComment,
  deleteComment as deleteCommentAPI
} from "../utils/PostsAPI";
import { errorFetchingData, errorSendingData } from ".";

export const COMMENTS_FETCHED = "COMMENTS_FETCHED";
function commentsFetched(postId, comments) {
  return {
    type: COMMENTS_FETCHED,
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

export const COMMENT_DELETED = "COMMENT_DELETED";
function commentDeleted(commentId, postId) {
  return {
    type: COMMENT_DELETED,
    postId,
    commentId
  };
}

export const fetchPostComments = postId => dispatch =>
  getPostComments(postId)
    .then(comments => dispatch(commentsFetched(postId, comments)))
    .catch(error => dispatch(errorFetchingData(error)));

export const saveComment = comment => dispatch =>
  addComment(comment)
    .then(comment => dispatch(commentSaved(comment)))
    .catch(error => dispatch(errorSendingData(error)));

export const deleteComment = commentId => dispatch =>
  deleteCommentAPI(commentId)
    .then(comment => dispatch(commentDeleted(commentId, comment.parentId)))
    .catch(error => dispatch(errorSendingData(error)));
