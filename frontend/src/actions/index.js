import { getCategories } from "../utils/PostsAPI";

export const INITIAL_DATA_FETCHING_STARTED = "INITIAL_DATA_FETCHING_STARTED";
function initialDataFetchingStarted() {
  return {
    type: INITIAL_DATA_FETCHING_STARTED
  };
}

export const INITIAL_DATA_FETCHED = "INITIAL_DATA_FETCHED";
function initialDataFetched(categories) {
  return {
    type: INITIAL_DATA_FETCHED,
    categories
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
  getCategories()
    .then(categories => dispatch(initialDataFetched(categories)))
    .catch(error => dispatch(errorFetchingData(error)));
};
