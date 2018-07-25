import { combineReducers } from "redux";
import {
  DATA_FETCHING_STARTED,
  ERROR_FETCHING_DATA,
  INITIAL_DATA_FETCHED,
  CATEGORY_POSTS_FETCHED
} from "../actions";

const INITIAL_STATE = {
  isLoading: false,
  errorFetchingData: undefined,
  categories: [],
  posts: [],
  postsFromCategory: []
};

function postData(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DATA_FETCHING_STARTED:
      return {
        ...INITIAL_STATE,
        isLoading: true,
        categories: state.categories,
        posts: state.posts
      };
    case ERROR_FETCHING_DATA:
      return {
        ...INITIAL_STATE,
        errorFetchingData: action.error
      };
    case INITIAL_DATA_FETCHED:
      return {
        ...INITIAL_STATE,
        categories: action.categories,
        posts: action.posts
      };
    case CATEGORY_POSTS_FETCHED:
      return {
        ...INITIAL_STATE,
        postsFromCategory: action.posts,
        categories: state.categories,
        posts: state.posts
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postData
});

export default rootReducer;
