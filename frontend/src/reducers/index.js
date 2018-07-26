import { combineReducers } from "redux";
import {
  DATA_FETCHING_STARTED,
  DATA_SENDING_STARTED,
  ERROR_FETCHING_DATA,
  ERROR_SENDING_DATA,
  INITIAL_DATA_FETCHED,
  CATEGORY_POSTS_FETCHED,
  POST_FETCHED,
  CATEGORIES_FETCHED,
  POST_SAVED,
  COMMENT_SAVED,
  POST_DELETED
} from "../actions";

const INITIAL_STATE = {
  isLoading: false,
  isSendingData: false,
  errorFetchingData: undefined,
  errorSendingData: undefined,
  categories: [],
  posts: [],
  postsFromCategory: [],
  post: undefined,
  comments: [],
  savedPost: undefined,
  savedComment: undefined,
  isPostDeleted: false
};

function postData(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DATA_FETCHING_STARTED:
      return {
        ...INITIAL_STATE,
        isLoading: true
      };
    case DATA_SENDING_STARTED:
      return {
        ...INITIAL_STATE,
        isSendingData: true
      };
    case ERROR_FETCHING_DATA:
      return {
        ...INITIAL_STATE,
        errorFetchingData: action.error
      };
    case ERROR_SENDING_DATA:
      return {
        ...INITIAL_STATE,
        errorSendingData: action.error
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
        postsFromCategory: action.postsFromCategory,
        categories: action.categories
      };
    case POST_FETCHED:
      return {
        ...INITIAL_STATE,
        post: action.post,
        comments: action.comments,
        categories: action.categories
      };
    case CATEGORIES_FETCHED:
      return {
        ...INITIAL_STATE,
        categories: action.categories
      };
    case POST_SAVED:
      return {
        ...INITIAL_STATE,
        savedPost: action.post
      };
    case COMMENT_SAVED:
      return {
        ...INITIAL_STATE,
        savedComment: action.comment
      };
    case POST_DELETED:
      return {
        ...INITIAL_STATE,
        isPostDeleted: true
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postData
});

export default rootReducer;
