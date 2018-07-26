import {
  getCategories,
  getAllPosts,
  getPostsFromCategory,
  getPost,
  getPostComments,
  addNewPost,
  updatePost as updatePostAPI,
  deletePost as deletePostAPI,
  addComment
} from "../utils/PostsAPI";

export const DATA_FETCHING_STARTED = "DATA_FETCHING_STARTED";
function dataFetchingStarted() {
  return {
    type: DATA_FETCHING_STARTED
  };
}

export const DATA_SENDING_STARTED = "DATA_SENDING_STARTED";
function dataSendingStarted() {
  return {
    type: DATA_SENDING_STARTED
  };
}

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

export const INITIAL_DATA_FETCHED = "INITIAL_DATA_FETCHED";
function initialDataFetched(categories, posts) {
  return {
    type: INITIAL_DATA_FETCHED,
    categories,
    posts
  };
}

export const CATEGORY_POSTS_FETCHED = "CATEGORY_POSTS_FETCHED";
function categoryPostsFetched(categories, postsFromCategory) {
  return {
    type: CATEGORY_POSTS_FETCHED,
    categories,
    postsFromCategory
  };
}

export const POST_FETCHED = "POST_FETCHED";
function postFetched(post, comments, categories) {
  return {
    type: POST_FETCHED,
    post,
    comments,
    categories
  };
}

export const CATEGORIES_FETCHED = "CATEGORIES_FETCHED";
function categoriesFetched(categories) {
  return {
    type: CATEGORIES_FETCHED,
    categories
  };
}

export const POST_SAVED = "POST_SAVED";
function postSaved(post) {
  return {
    type: POST_SAVED,
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
function postDeleted() {
  return {
    type: POST_DELETED
  };
}

export const fetchInitialData = () => dispatch => {
  dispatch(dataFetchingStarted());
  Promise.all([getCategories(), getAllPosts()])
    .then(([categories, posts]) =>
      dispatch(initialDataFetched(categories, posts))
    )
    .catch(error => dispatch(errorFetchingData(error)));
};

export const fetchPostsFromCategory = categoryPath => dispatch => {
  dispatch(dataFetchingStarted());
  // Fetching the list of categories is necessary to get the category name
  Promise.all([getCategories(), getPostsFromCategory(categoryPath)])
    .then(([categories, postsFromCategory]) =>
      dispatch(categoryPostsFetched(categories, postsFromCategory))
    )
    .catch(error => dispatch(errorFetchingData(error)));
};

export const fetchPost = postId => dispatch => {
  dispatch(dataFetchingStarted());
  // Fetching the list of categories is necessary to be able to edit the post
  Promise.all([getPost(postId), getPostComments(postId), getCategories()])
    .then(([post, comments, categories]) =>
      dispatch(postFetched(post, comments, categories))
    )
    .catch(error => dispatch(errorFetchingData(error)));
};

export const fetchCategories = () => dispatch => {
  dispatch(dataFetchingStarted());
  getCategories()
    .then(categories => dispatch(categoriesFetched(categories)))
    .catch(error => dispatch(errorFetchingData(error)));
};

export const savePost = post => dispatch => {
  dispatch(dataSendingStarted());
  addNewPost(post)
    .then(post => dispatch(postSaved(post)))
    .catch(error => dispatch(errorSendingData(error)));
};

export const updatePost = (id, post) => dispatch => {
  dispatch(dataSendingStarted());
  updatePostAPI(id, post)
    .then(updatedPost => dispatch(postSaved(updatedPost)))
    .catch(error => dispatch(errorSendingData(error)));
};

export const deletePost = id => dispatch => {
  dispatch(dataSendingStarted());
  deletePostAPI(id)
    .then(() => dispatch(postDeleted()))
    .catch(error => dispatch(errorSendingData(error)));
};

export const saveComment = comment => dispatch => {
  dispatch(dataSendingStarted());
  addComment(comment)
    .then(comment => dispatch(commentSaved(comment)))
    .catch(error => dispatch(errorSendingData(error)));
};
