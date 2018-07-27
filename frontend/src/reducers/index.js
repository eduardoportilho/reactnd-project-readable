import { combineReducers } from "redux";
import post from "./post";
import category from "./category";
import comment from "./comment";
import { ERROR_FETCHING_DATA, ERROR_SENDING_DATA } from "../actions";

const INITIAL_STATE = {
  errorFetchingData: undefined,
  errorSendingData: undefined
};

function common(state = INITIAL_STATE, action) {
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
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  common,
  category,
  comment,
  post
});

export default rootReducer;
