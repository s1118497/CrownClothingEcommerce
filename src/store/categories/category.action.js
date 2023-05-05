import { createAction } from "../../utils/reducers/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const fetchCategoriesStart = () =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
export const fetchCategoriesSuccess = (categoriesArray) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);
export const fetchCategoriesFail = (err) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, err);

//  action no longer needed, as redux-saga only listen to action.type:  FETCH_CATEGORIES_START

// export const fetchCategoriesAsync = () => async (dispatch) => {
// 	dispatch(fetchCategoriesStart()); // (sync) pass to categories reducer first
// 	try {
// 		const categoriesArray = await getCategoriesAndDocuments();
// 		dispatch(fetchCategoriesSuccess(categoriesArray)); // (async) waiting result then pass to categories
// 	} catch (err) {
// 		dispatch(fetchCategoriesFail(err)); // (async) waiting result then pass to categories
// 	}
// };

// Simply export an async function also work, if no extra parameter need to pass

// export const fetchCategoriesAsync = async (dispatch) => {
// 	dispatch(fetchCategoriesStart()); // (sync) pass to categories reducer first
// 	try {
// 		const categoriesArray = await getCategoriesAndDocuments();
// 		dispatch(fetchCategoriesSuccess(categoriesArray)); // (async) waiting result then pass to categories
// 	} catch (err) {
// 		dispatch(fetchCategoriesFail(err)); // (async) waiting result then pass to categories
// 	}
// };
