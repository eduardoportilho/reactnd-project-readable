import {
  POSTS_FETCHED,
  POST_FETCHED,
  POST_ADDED,
  POST_UPDATED,
  POST_DELETED
} from "../actions";

const INITIAL_STATE = {
  posts: []
};

function post(state = INITIAL_STATE, action) {
  switch (action.type) {
    case POSTS_FETCHED:
      return {
        ...state,
        posts: action.posts
      };
    case POST_FETCHED:
      return {
        ...state,
        posts: [
          ...state.posts.filter(post => post.id !== action.post.id),
          action.post
        ]
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
    case POST_DELETED:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId)
      };
    default:
      return state;
  }
}

export default post;
