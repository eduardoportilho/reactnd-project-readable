import { getCategories, getAllPosts } from "../utils/PostsAPI";

export const INITIAL_DATA_FETCHING_STARTED = "INITIAL_DATA_FETCHING_STARTED";
function initialDataFetchingStarted() {
  return {
    type: INITIAL_DATA_FETCHING_STARTED
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

export const ERROR_FETCHING_DATA = "ERROR_FETCHING_DATA";
function errorFetchingData(error) {
  return {
    type: ERROR_FETCHING_DATA,
    error
  };
}
export const fetchInitialData = () => dispatch => {
  dispatch(initialDataFetchingStarted());
  Promise.all([getCategories(), getAllPosts()])
    .then(([categories, posts]) =>
      dispatch(initialDataFetched(categories, posts))
    )
    .catch(error => dispatch(errorFetchingData(error)));
};
