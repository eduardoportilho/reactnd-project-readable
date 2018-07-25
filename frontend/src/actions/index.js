import {
  getCategories,
  getAllPosts,
  getPostsFromCategory,
  getPost,
  getPostComments,
  addNewPost
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

export const DATA_SENDING_COMPLETED = "DATA_SENDING_COMPLETED";
function dataSendingCompleted() {
  return {
    type: DATA_SENDING_COMPLETED
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
function postFetched(post, comments) {
  return {
    type: POST_FETCHED,
    post,
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
  Promise.all([getCategories(), getPostsFromCategory(categoryPath)])
    .then(([categories, postsFromCategory]) =>
      dispatch(categoryPostsFetched(categories, postsFromCategory))
    )
    .catch(error => dispatch(errorFetchingData(error)));
};

export const fetchPost = postId => dispatch => {
  dispatch(dataFetchingStarted());
  Promise.all([getPost(postId), getPostComments(postId)])
    .then(([post, comments]) => dispatch(postFetched(post, comments)))
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
    .then(() => dispatch(dataSendingCompleted()))
    .catch(error => dispatch(errorSendingData(error)));
};
