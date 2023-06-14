// selector functions for useSelector hook, to extract the corresponding user state property

import { createSelector } from "reselect";
import { UserState } from "./user.reducer";

const selectUserReducer = (state): UserState => state.user;

export const selectCurrentUser = createSelector(
	selectUserReducer,
	(userSlice) => userSlice.currentUser
);
