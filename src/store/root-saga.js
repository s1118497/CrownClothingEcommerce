import { all, call } from "redux-saga/effects";

import { categoriesSaga } from "./categories/category.saga";

// a generator function to encapsulate all the sagas
export function* rootSaga() {
	yield all([call(categoriesSaga)]);
}
