import {
  getCategories,
  getAllPosts,
  getPostsFromCategory
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
function categoryPostsFetched(posts) {
  return {
    type: CATEGORY_POSTS_FETCHED,
    posts
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
  getPostsFromCategory(categoryPath)
    .then(posts => dispatch(categoryPostsFetched(posts)))
    .catch(error => dispatch(errorFetchingData(error)));
};
