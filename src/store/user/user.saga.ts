import { call, put, takeLatest, all } from "typed-redux-saga/macro";

import {
	signInSuccess,
	signInFail,
	signOutSuccess,
	signUpFail,
	signUpSuccess,
	signOutFail,
	EmailSignInStart,
	SignUpStart,
	SignUpSuccess,
} from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

import {
	getCurrentUser,
	createUserDocFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	signOutUser,
	createAuthUserWithEmailAndPassword,
	AdditionalInfo,
} from "../../utils/firebase/firebase.utils";
import { User } from "firebase/auth";

//  final common saga task for every auth --> sign-in || sign-up
export function* getSnapShotFromUserAuth(userAuth: User, additionalInfo?: AdditionalInfo) {
	try {
		// * use the userSnapshot data to store in redux state*
		const userSnapshot = yield* call(createUserDocFromAuth, userAuth, additionalInfo);
		yield* put(signInSuccess({ ...userSnapshot.data(), id: userAuth.uid }));
	} catch (error) {
		yield* put(signInFail(error as Error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield* call(getCurrentUser);
		// when sign-out, userAuth = null, return undefined, will not call getDocSnapshot
		// when sign-in, userAuth = User type, return user, and then call getDocSnapshot with that user info
		if (!userAuth) return;
		yield* call(getSnapShotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFail(error as Error));
	}
}
// entry point for checking saga
// 		onCheckUserSession ==> isUserAuthenticated ==> createUserDocFromAuth (if sign-in)
export function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signInWithGoogle() {
	try {
		const userCredential = yield* call(signInWithGooglePopup);
		yield call(getSnapShotFromUserAuth, userCredential.user);
	} catch (error) {
		yield put(signInFail(error as Error));
	}
}
// entry point for google sign in saga
export function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// {action} will pass to saga task as argument
export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
	try {
		const userAuth = yield* call(signInAuthUserWithEmailAndPassword, email, password);
		if (userAuth) yield* call(getSnapShotFromUserAuth, userAuth);
	} catch (error) {
		yield* put(signInFail(error as Error));
	}
}

// entry point for email sign in saga
export function* onEmailSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* signOut() {
	try {
		yield* call(signOutUser);
		yield* put(signOutSuccess());
	} catch (error) {
		yield* put(signOutFail(error as Error));
	}
}

export function* onSignOutStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* signUp({ payload: { email, password, displayName } }: SignUpStart) {
	try {
		const userAuth = yield* call(createAuthUserWithEmailAndPassword, email, password);
		// dispatch subsequent SIGN_UP_SUCCESS action
		if (userAuth) yield* put(signUpSuccess(userAuth, { displayName }));
	} catch (error) {
		yield* put(signUpFail(error as Error));
	}
}

// entry point for sign up saga
export function* onSignUpStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

// payload: { user:{userAuth} , displayName: }
export function* signInAfterSignUp({ payload: { userAuth, displayName } }: SignUpSuccess) {
	yield* call(getSnapShotFromUserAuth, userAuth, { displayName });
}

// entry point for SIGN_UP_SUCCESS action
export function* onSignUpSuccess() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// listen all user action, parellel run corresponding sagas
export function* userSagas() {
	yield* all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignOutStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
	]);
}
