import {
  getAllPosts,
  getPost,
  addNewPost,
  updatePost as updatePostAPI,
  deletePost as deletePostAPI
} from "../utils/PostsAPI";
import { errorFetchingData, errorSendingData } from ".";

export const POSTS_FETCHED = "POSTS_FETCHED";
function postsFetched(posts) {
  return {
    type: POSTS_FETCHED,
    posts
  };
}

export const POST_FETCHED = "POST_FETCHED";
function postFetched(post) {
  return {
    type: POST_FETCHED,
    post
  };
}

export const POST_ADDED = "POST_ADDED";
function postAdded(post) {
  return {
    type: POST_ADDED,
    post
  };
}

export const POST_UPDATED = "POST_UPDATED";
function postUpdated(post) {
  return {
    type: POST_UPDATED,
    post
  };
}

export const POST_DELETED = "POST_DELETED";
function postDeleted(postId) {
  return {
    type: POST_DELETED,
    postId
  };
}

export const fetchPosts = () => dispatch =>
  getAllPosts()
    .then(posts => dispatch(postsFetched(posts)))
    .catch(error => dispatch(errorFetchingData(error)));

export const fetchPost = postId => dispatch =>
  getPost(postId)
    .then(post => dispatch(postFetched(post)))
    .catch(error => dispatch(errorFetchingData(error)));

export const savePost = post => dispatch =>
  addNewPost(post)
    .then(post => dispatch(postAdded(post)))
    .catch(error => dispatch(errorSendingData(error)));

export const updatePost = (id, post) => dispatch =>
  updatePostAPI(id, post)
    .then(updatedPost => dispatch(postUpdated(updatedPost)))
    .catch(error => dispatch(errorSendingData(error)));

export const deletePost = id => dispatch =>
  deletePostAPI(id)
    .then(() => dispatch(postDeleted(id)))
    .catch(error => dispatch(errorSendingData(error)));
