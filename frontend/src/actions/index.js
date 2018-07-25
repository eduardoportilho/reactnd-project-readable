import {
  getCategories,
  getAllPosts,
  getPostsFromCategory,
  getPost,
  getPostComments
} from "../utils/PostsAPI";

export const DATA_FETCHING_STARTED = "DATA_FETCHING_STARTED";
function dataFetchingStarted() {
  return {
    type: DATA_FETCHING_STARTED
  };
}

export const ERROR_FETCHING_DATA = "ERROR_FETCHING_DATA";
function errorFetchingData(error) {
  return {
    type: ERROR_FETCHING_DATA,
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
function postFetched(post, comments) {
  return {
    type: POST_FETCHED,
    post,
    comments
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
