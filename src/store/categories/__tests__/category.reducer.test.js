import { categoriesReducer, CATEGORIES_INITIAL_STATE } from "../category.reducer";
import {
	fetchCategoriesStart,
	fetchCategoriesFail,
	fetchCategoriesSuccess,
} from "../category.action";

describe("Category reducer tests", () => {
	it("should return initial categories state if no action received", () => {
		expect(categoriesReducer(undefined, {})).toBe(CATEGORIES_INITIAL_STATE); // toEqual(), deep compare also work
	});

	it("fetchCategoriesStart", () => {
		expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart())).toEqual({
			...CATEGORIES_INITIAL_STATE,
			isLoading: true,
		});
	});

	it("fetchCategoriesFail", () => {
		const mockError = new Error("test error message");
		expect(categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesFail(mockError))).toEqual(
			{
				...CATEGORIES_INITIAL_STATE,
				isLoading: false,
				error: mockError,
			}
		);
	});

	it("fetchCategoriesSuccess", () => {
		const mockCategoriesArray = [{ title: "test", items: [] }];
		expect(
			categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesSuccess(mockCategoriesArray))
		).toEqual({
			...CATEGORIES_INITIAL_STATE,
			isLoading: false,
			categories: mockCategoriesArray,
		});
	});
});
