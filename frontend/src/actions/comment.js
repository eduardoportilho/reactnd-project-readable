import {
  getPostComments,
  addComment,
  deleteComment as deleteCommentAPI,
  updateComment as updateCommentAPI,
  voteOnComment
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

export const COMMENT_UPDATED = "COMMENT_UPDATED";
function commentUpdated(comment) {
  return {
    type: COMMENT_UPDATED,
    comment
  };
}

export const COMMENT_UP_VOTED = "COMMENT_UP_VOTED";
function commentUpVoted(commentId, postId) {
  return {
    type: COMMENT_UP_VOTED,
    postId,
    commentId
  };
}

export const COMMENT_DOWN_VOTED = "COMMENT_DOWN_VOTED";
function commentDownVoted(commentId, postId) {
  return {
    type: COMMENT_DOWN_VOTED,
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

export const updateComment = (id, comment) => dispatch =>
  updateCommentAPI(id, comment)
    .then(updatedComment => dispatch(commentUpdated(updatedComment)))
    .catch(error => dispatch(errorSendingData(error)));

export const voteCommentUp = (commentId, postId) => dispatch =>
  voteOnComment(commentId, true)
    .then(() => dispatch(commentUpVoted(commentId, postId)))
    .catch(error => dispatch(errorFetchingData(error)));

export const voteCommentDown = (commentId, postId) => dispatch =>
  voteOnComment(commentId, false)
    .then(() => dispatch(commentDownVoted(commentId, postId)))
    .catch(error => dispatch(errorFetchingData(error)));
