import { createAction } from "../../utils/reducers/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
const fetchCategoriesSuccess = (categoriesArray) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);
const fetchCategoriesFail = (err) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, err);

// export the thunk action (async) for component to dispatch
//  *note*
// 		thunk funciton will return a callback function with dispatch as argument, store will run the callback
export const fetchCategoriesAsync = () => async (dispatch) => {
	dispatch(fetchCategoriesStart()); // (sync) pass to categories reducer first
	try {
		const categoriesArray = await getCategoriesAndDocuments();
		dispatch(fetchCategoriesSuccess(categoriesArray)); // (async) waiting result then pass to categories
	} catch (err) {
		dispatch(fetchCategoriesFail(err)); // (async) waiting result then pass to categories
	}
};
