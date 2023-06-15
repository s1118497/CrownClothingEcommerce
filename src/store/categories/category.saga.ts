import { takeLatest, all, call, put } from "typed-redux-saga";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesSuccess, fetchCategoriesFail } from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
	try {
		const categoriesArray = yield* call(getCategoriesAndDocuments);
		yield* put(fetchCategoriesSuccess(categoriesArray));
	} catch (err) {
		yield* put(fetchCategoriesFail(err as Error));
	}
}

export function* onFetchCategories() {
	yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

// aggregator of all sagas related to category
export function* categoriesSaga() {
	yield* all([call(onFetchCategories)]);
}
