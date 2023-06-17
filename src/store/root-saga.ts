import { all, call } from "typed-redux-saga/macro";

import { categoriesSaga } from "./categories/category.saga";
import { userSagas } from "./user/user.saga";

// a generator function to encapsulate all the sagas
export function* rootSaga() {
	yield* all([call(categoriesSaga), call(userSagas)]);
}
