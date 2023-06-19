import {
	createAction,
	Action,
	ActionWithPayload,
	withMatcher,
} from "../../utils/reducers/reducer.utils";
import { User } from "firebase/auth";
import { SignUpCredential, USER_ACTION_TYPES } from "./user.types";
import { AdditionalInfo, UserData } from "../../utils/firebase/firebase.utils";

// Action type
type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
export type EmailSignInStart = ActionWithPayload<
	USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
	{ email: string; password: string }
>;
type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>;
type SignInFail = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAIL, Error>;
type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
type SignOutFail = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAIL, Error>;
export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, SignUpCredential>;
export type SignUpSuccess = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_UP_SUCCESS,
	{
		userAuth: User;
	} & AdditionalInfo
>;
type SignUpFail = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAIL, Error>;

// decorated AC
const checkUserSession = withMatcher(
	(): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);
const googleSignInStart = withMatcher(
	(): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);
const emailSignInStart = withMatcher(
	(email: string, password: string): EmailSignInStart =>
		createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
);
const signInSuccess = withMatcher(
	(user: UserData): SignInSuccess => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);
const signInFail = withMatcher(
	(error: Error): SignInFail => createAction(USER_ACTION_TYPES.SIGN_IN_FAIL, error)
);
const signOutStart = withMatcher(
	(): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);
const signOutSuccess = withMatcher(
	(): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);
const signOutFail = withMatcher(
	(error: Error): SignOutFail => createAction(USER_ACTION_TYPES.SIGN_OUT_FAIL, error)
);
const signUpStart = withMatcher(
	(credential: SignUpCredential): SignUpStart =>
		createAction(USER_ACTION_TYPES.SIGN_UP_START, credential)
);
// this action aim for the saga task, not for reducer update
const signUpSuccess = withMatcher(
	(userAuth: User, additionalInfo: AdditionalInfo): SignUpSuccess =>
		createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { userAuth, ...additionalInfo })
);
const signUpFail = withMatcher(
	(error: Error): SignUpFail => createAction(USER_ACTION_TYPES.SIGN_UP_FAIL, error)
);

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
