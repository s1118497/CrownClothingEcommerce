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
const signOutFail = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAIL, error);
const signUpStart = (credential) =>
	// payload = {email, password, displayName }, to avoid mutation
	createAction(USER_ACTION_TYPES.SIGN_UP_START, { ...credential });
// this action aim for the saga task, not for reducer update
const signUpSuccess = (user, additionalInfo) =>
	createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalInfo });
const signUpFail = (error) => createAction(USER_ACTION_TYPES.SIGN_UP_FAIL, error);

export {
	checkUserSession,
	googleSignInStart,
	emailSignInStart,
	signInSuccess,
	signInFail,
	signOutStart,
	signOutSuccess,
	signOutFail,
	signUpStart,
	signUpSuccess,
	signUpFail,
};
