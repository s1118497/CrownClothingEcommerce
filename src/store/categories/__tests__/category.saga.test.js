import { testSaga, expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { call } from "redux-saga-test-plan/matchers";
import { fetchCategoriesAsync, onFetchCategories, categoriesSaga } from "../category.saga";
import { CATEGORIES_ACTION_TYPES } from "../category.types";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import { fetchCategoriesFail, fetchCategoriesSuccess } from "../category.action";

describe("category saga test", () => {
	// testSaga(): just testing saga yields specific types of effects in a particular order.
	test("categoriesSaga", () => {
		testSaga(categoriesSaga)
			.next()
			.all([call(onFetchCategories)])
			.next()
			.isDone();
	});

	test("onFetchCategories", () => {
		testSaga(onFetchCategories)
			.next()
			.takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
			.next()
			.isDone();
	});

	test("fetchCategoriesAsync when success", () => {
		const mockCategoriesArray = [
			{ title: "mens", items: [{ id: 1, name: "product A" }] },
			{ title: "shoes", items: [{ id: 2, name: "product B" }] },
		];
		return expectSaga(fetchCategoriesAsync)
			.provide([[call(getCategoriesAndDocuments), mockCategoriesArray]])
			.put(fetchCategoriesSuccess(mockCategoriesArray))
			.run();
	});
	test("fetchCategoriesAsync when error", () => {
		const mockError = new Error("error in getCategoriesAndDocuments call");
		return expectSaga(fetchCategoriesAsync)
			.provide([[call(getCategoriesAndDocuments), throwError(mockError)]])
			.put(fetchCategoriesFail(mockError))
			.run();
	});
});
