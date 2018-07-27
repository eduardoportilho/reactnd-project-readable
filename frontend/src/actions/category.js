import { getCategories } from "../utils/PostsAPI";
import { errorFetchingData } from ".";

export const CATEGORIES_FETCHED = "CATEGORIES_FETCHED";
function categoriesFetched(categories) {
  return {
    type: CATEGORIES_FETCHED,
    categories
  };
}

export const fetchCategories = () => dispatch =>
  getCategories()
    .then(categories => dispatch(categoriesFetched(categories)))
    .catch(error => dispatch(errorFetchingData(error)));
