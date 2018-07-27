import { CATEGORIES_FETCHED } from "../actions";

const INITIAL_STATE = {
  categories: []
};

function category(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CATEGORIES_FETCHED:
      return {
        ...state,
        categories: action.categories
      };
    default:
      return state;
  }
}

export default category;
