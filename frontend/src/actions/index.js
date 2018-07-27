import {
  getCategories,
  getAllPosts,
  getPost,
  getPostComments,
  addNewPost,
  updatePost as updatePostAPI,
  deletePost as deletePostAPI,
  addComment
} from "../utils/PostsAPI";

export const ERROR_FETCHING_DATA = "ERROR_FETCHING_DATA";
function errorFetchingData(error) {
  return {
    type: ERROR_FETCHING_DATA,
    error
  };
}

export const ERROR_SENDING_DATA = "ERROR_SENDING_DATA";
function errorSendingData(error) {
  return {
    type: ERROR_SENDING_DATA,
    error
  };
}

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

export const POST_COMMENTS_FETCHED = "POST_COMMENTS_FETCHED";
function postCommentsFetched(postId, comments) {
  return {
    type: POST_COMMENTS_FETCHED,
    postId,
    comments
  };
}

export const CATEGORIES_FETCHED = "CATEGORIES_FETCHED";
function categoriesFetched(categories) {
  return {
    type: CATEGORIES_FETCHED,
    categories
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

export const COMMENT_SAVED = "COMMENT_SAVED";
function commentSaved(comment) {
  return {
    type: COMMENT_SAVED,
    comment
  };
}

export const POST_DELETED = "POST_DELETED";
function postDeleted(postId) {
  return {
    type: POST_DELETED,
    postId
  };
}

export const fetchAllPosts = () => dispatch =>
  Promise.all([getCategories(), getAllPosts()])
    .then(([categories, posts]) =>
      Promise.all([
        dispatch(categoriesFetched(categories)),
        dispatch(postsFetched(posts))
      ])
    )
    .catch(error => dispatch(errorFetchingData(error)));

export const fetchPost = postId => dispatch =>
  // Fetching the list of categories is necessary to be able to edit the post
  Promise.all([getPost(postId), getCategories()])
    .then(([post, categories]) =>
      Promise.all([
        dispatch(categoriesFetched(categories)),
        dispatch(postFetched(post))
      ])
    )
    .catch(error => dispatch(errorFetchingData(error)));

export const fetchPostComments = postId => dispatch =>
  getPostComments(postId)
    .then(comments => dispatch(postCommentsFetched(postId, comments)))
    .catch(error => dispatch(errorFetchingData(error)));

export const fetchCategories = () => dispatch =>
  getCategories()
    .then(categories => dispatch(categoriesFetched(categories)))
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

export const saveComment = comment => dispatch =>
  addComment(comment)
    .then(comment => dispatch(commentSaved(comment)))
    .catch(error => dispatch(errorSendingData(error)));
