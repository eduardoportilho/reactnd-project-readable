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
    categories: []
  },
  action
) {
  switch (action.type) {
    case INITIAL_DATA_FETCHING_STARTED:
      return Object.assign({}, state, {
        isLoading: true,
        errorFetchingData: undefined,
        categories: []
      });
    case INITIAL_DATA_FETCHED:
      return Object.assign({}, state, {
        isLoading: false,
        errorFetchingData: undefined,
        categories: action.categories
      });
    case ERROR_FETCHING_DATA:
      return Object.assign({}, state, {
        isLoading: false,
        errorFetchingData: action.error,
        categories: []
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postData
});

export default rootReducer;
