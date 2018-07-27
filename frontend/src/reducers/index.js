import { combineReducers } from "redux";
import {
  ERROR_FETCHING_DATA,
  ERROR_SENDING_DATA,
  INITIAL_DATA_FETCHED,
  POST_FETCHED,
  POST_COMMENTS_FETCHED,
  CATEGORIES_FETCHED,
  POST_ADDED,
  POST_UPDATED,
  COMMENT_SAVED,
  POST_DELETED
} from "../actions";

const INITIAL_STATE = {
  errorFetchingData: undefined,
  errorSendingData: undefined,
  categories: [],
  posts: [],
  postComments: []
};

function postData(state = INITIAL_STATE, action) {
  let postComments, comments;
  switch (action.type) {
    case ERROR_FETCHING_DATA:
      return {
        ...state,
        errorFetchingData: action.error
      };
    case ERROR_SENDING_DATA:
      return {
        ...state,
        errorSendingData: action.error
      };

    case INITIAL_DATA_FETCHED:
      return {
        ...state,
        categories: action.categories,
        posts: action.posts
      };
    case POST_FETCHED:
      return {
        ...state,
        posts: [
          ...state.posts.filter(post => post.id !== action.post.id),
          action.post
        ],
        categories: action.categories
      };
    case POST_COMMENTS_FETCHED:
      postComments = { ...state.postComments };
      postComments[action.postId] = action.comments;
      return {
        ...state,
        postComments
      };
    case CATEGORIES_FETCHED:
      return {
        ...state,
        categories: action.categories
      };
    case POST_ADDED:
      return {
        ...state,
        posts: [
          ...state.posts.filter(post => post.id !== action.post.id),
          action.post
        ]
      };
    case POST_UPDATED:
      return {
        ...state,
        posts: state.posts.map(
          post => (post.id === action.post.id ? action.post : post)
        )
      };
    case COMMENT_SAVED:
      postComments = { ...state.postComments };
      comments = postComments[action.comment.parentId] || [];
      postComments[action.comment.parentId] = [...comments, action.comment];
      return {
        ...state,
        postComments
      };
    case POST_DELETED:
      postComments = { ...state.postComments };
      delete postComments[action.postId];
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId),
        postComments
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postData
});

export default rootReducer;
