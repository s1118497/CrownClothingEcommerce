import { createSelector } from "reselect";

//  memoized selector function = createSelector( [input selector,...] , output selector)
// 		--> if input selector unchange, just return old result, don't run output selector

// state = entire redux state: {user:{currentUser:{..}}, categories:{categories:[..]}}
const selectCategoriesReducer = (state) => state.categories;

// catergories= {categories:[..]}
const selectCategoriesArr = createSelector(
	[selectCategoriesReducer],
	(categoriesReducer) => categoriesReducer.categories
);

// export a memoized selector function
// 		return same acc categoryMap object reference, if input selectCategoriesArr doesn't change
// 			then useSelector will return same result when rerun
// 				So <Category> won't rerender if only user action trigger
export const selectCatogoriesMap = createSelector([selectCategoriesArr], (categorieisArr) =>
	categorieisArr.reduce((acc, category) => {
		const { items, title } = category;
		acc[title.toLowerCase()] = items;
		return acc;
	}, {})
);

// *notes*
// format the each document data [ {title: "hat", items: [xxx, xxx, xxx]} , {title: "jackets", items: [xxx, xxx, xxx]} ]
// 		into one categoryMap { hat: [xxx, xxx, xxx], jackets: [xxx, xxx, xxx] }
// Reason: Objects (Hash Table data structure) better for searching O[1] for items than Array O[N].
