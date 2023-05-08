import { createAction } from "../../utils/reducers/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

// // no need after migrate to saga
// // a helper function that dispatch an action object to reducer function
// const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
const emailSignInStart = (email, password) =>
	createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });
const signInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
const signInFail = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAIL, error);
const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START);
const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
const signUpStart = (credential) => createAction(USER_ACTION_TYPES.SIGN_UP_START, credential);
const signUpFail = (error) => createAction(USER_ACTION_TYPES.SIGN_UP_FAIL, error);

export {
	checkUserSession,
	googleSignInStart,
	emailSignInStart,
	signInSuccess,
	signInFail,
	signOutStart,
	signOutSuccess,
	signUpStart,
	signUpFail,
};
