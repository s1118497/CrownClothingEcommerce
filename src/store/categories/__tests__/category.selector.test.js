import {
	selectCatogoriesMap,
	selectCategoriesIsLoading,
	selectCategoriesArr,
} from "../category.selector";

const mockRootState = {
	categories: {
		isLoading: false,
		categories: [
			{
				title: "mens",
				items: [
					{
						id: 1,
						imageUrl: "test",
						name: "product 1",
						price: 123,
					},
				],
			},
			{
				title: "hats",
				items: [
					{
						id: 1,
						imageUrl: "test",
						name: "product 2",
						price: 123,
					},
				],
			},
		],
	},
};

// note: createSelector return a function that can be passed with parameter: https://stackoverflow.com/questions/67615495/im-confused-about-the-arguments-that-i-passe-to-a-selector-function-that-uses-r

describe("category selector tests", () => {
	it("selectCategoriesArr should return categories array ", () => {
		const categoriesArr = selectCategoriesArr(mockRootState);
		expect(categoriesArr).toEqual(mockRootState.categories.categories);
	});

	it("selectCategoriesIsLoading should return isLoading state", () => {
		const isLoading = selectCategoriesIsLoading(mockRootState);
		expect(isLoading).toBeFalsy();
	});

	it("selectCatogoriesMap should covert categories array into appropriate map", () => {
		//#region  *chaining selectors* note: WHY NOT selectCatogoriesMap(mockRootState.categories)
		// 1) In selectCatogoriesMap, "mockRootState" param will pass to selectCategoriesArr
		// 	2) In selectCategoriesArr, "mockRootState" will pass to selectCategoriesReducer
		// 		3) In selectCategoriesReducer,  "mockRootState" will pass as the state params
		//#endregion

		const categoriesMap = selectCatogoriesMap(mockRootState);
		expect(categoriesMap).toEqual({
			mens: [
				{
					id: 1,
					imageUrl: "test",
					name: "product 1",
					price: 123,
				},
			],
			hats: [
				{
					id: 1,
					imageUrl: "test",
					name: "product 2",
					price: 123,
				},
			],
		});
	});
});
