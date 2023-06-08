import {
	createAction,
	Action,
	ActionWithPayload,
	withMatcher,
} from "../../utils/reducers/reducer.utils";
import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";

// Define fetchCategoriesXXX method return type
export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
	Category[]
>;
export type FetchCategoriesFail = ActionWithPayload<
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL,
	Error
>;

// decoratored fetch categories action creator function
// 		adding type property & match method
export const fetchCategoriesStart = withMatcher(
	(): FetchCategoriesStart => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
	(categoriesArray: Category[]): FetchCategoriesSuccess =>
		createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)
);

export const fetchCategoriesFail = withMatcher(
	(err: Error): FetchCategoriesFail =>
		createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL, err)
);

//  thunk-action no longer needed, as redux-saga only listen to action.type:  FETCH_CATEGORIES_START

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
