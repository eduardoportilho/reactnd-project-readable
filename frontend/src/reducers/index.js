import { combineReducers } from "redux";
import {
  INITIAL_DATA_FETCHING_STARTED,
  INITIAL_DATA_FETCHED,
  ERROR_FETCHING_DATA
} from "../actions";

function postData(
  state = {
    isLoading: false,
    errorFetchingData: undefined,
    categories: [],
    posts: []
  },
  action
) {
  switch (action.type) {
    case INITIAL_DATA_FETCHING_STARTED:
      return Object.assign({}, state, {
        isLoading: true,
        errorFetchingData: undefined,
        categories: [],
        posts: []
      });
    case INITIAL_DATA_FETCHED:
      return Object.assign({}, state, {
        isLoading: false,
        errorFetchingData: undefined,
        categories: action.categories,
        posts: action.posts
      });
    case ERROR_FETCHING_DATA:
      return Object.assign({}, state, {
        isLoading: false,
        errorFetchingData: action.error,
        categories: [],
        posts: []
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postData
});

export default rootReducer;
