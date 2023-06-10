import { AnyAction } from "redux";
import { Category } from "./category.types";
import {
	fetchCategoriesStart,
	fetchCategoriesSuccess,
	fetchCategoriesFail,
} from "./category.action";

// readonly: can prevent state mutation
export type CategoriesState = {
	readonly categories: Category[];
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const CATEGORIES_INITIAL_STATE: CategoriesState = { categories: [], isLoading: false, error: null };

//  Type Casting/Assertion -- "as" keyword : https://www.typescripttutorial.net/typescript-tutorial/type-casting
export const categoriesReducer = (
	state = CATEGORIES_INITIAL_STATE,
	action: AnyAction
	// any redux action can be passed, only categories action get response from this reducer, otherwise return previous state
): CategoriesState => {
	// User-defined Type Guards Function, match()
	if (fetchCategoriesStart.match(action)) return { ...state, isLoading: true };
	if (fetchCategoriesSuccess.match(action))
		return { ...state, isLoading: false, categories: action.payload };
	if (fetchCategoriesFail.match(action))
		return { ...state, isLoading: false, error: action.payload };
	// for user/cart action, redux @@init action, and other middleware action ...
	return state;

	/* switch statement version by means of comparing type value? 
	switch (action.type) {
		case fetchCategoriesStart.type:
			return { ...state, isLoading: true };
		case fetchCategoriesSuccess.type:
			return { ...state, isLoading: false, categories: action.payload };
		case fetchCategoriesFail.type:
			return { ...state, isLoading: false, error: action.payload };
		default:
			return state;
	}
	*/
};
