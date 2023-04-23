import { createAction } from "../../utils/reducers/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

// a helper function that dispatch an action object to reducer function
export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
