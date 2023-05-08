import { call, put, takeLatest, all } from "redux-saga/effects";

import {
	signInSuccess,
	signInFail,
	signOutSuccess,
	signUpFail,
	signUpSuccess,
} from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

import {
	getCurrentUser,
	createUserDocFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	signOutUser,
	createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

//  final common saga task for auth checking || sign-in || sign-up
export function* getSnapShotFromUserAuth(userAuth, additionalInfo) {
	try {
		// * use the userSnapshot data to store in redux state*
		const userSnapshot = yield call(createUserDocFromAuth, userAuth, additionalInfo);
		yield put(signInSuccess({ ...userSnapshot.data(), id: userSnapshot.id }));
	} catch (error) {
		yield put(signInFail(error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser);
		// when sign-out, userAuth = null, return, no need to getDocSnapshot
		if (!userAuth) return;
		yield call(getSnapShotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFail(error));
	}
}
// entry point for checking saga
export function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signInWithGoogle() {
	try {
		const userCredential = yield call(signInWithGooglePopup);
		yield call(getSnapShotFromUserAuth, userCredential.user);
	} catch (error) {
		yield put(signInFail(error));
	}
}
// entry point for google sign in saga
export function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// {action} will pass to saga task as argument
export function* signInWithEmail(action) {
	const { email, password } = action.payload;
	try {
		const userAuth = yield call(signInAuthUserWithEmailAndPassword, email, password);
		yield call(getSnapShotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFail(error));
	}
}

// entry point for email sign in saga
export function* onEmailSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* signOutCurrentUser() {
	yield call(signOutUser);
	yield put(signOutSuccess());
}

export function* onSignOut() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutCurrentUser);
}

export function* signUp({ payload: { email, password, displayName } }) {
	try {
		const { user: userAuth } = yield call(createAuthUserWithEmailAndPassword, email, password);
		// dispatch subsequent SIGN_UP_SUCCESS action
		yield put(signUpSuccess(userAuth, { displayName }));
	} catch (error) {
		yield put(signUpFail(error));
	}
}

// entry point for sign up saga
export function* onSignUpStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

// payload: { user:{userAuth} , additionalInfo: {displayName} }
export function* signInAfterSignUp({ payload: { user, additionalInfo } }) {
	yield call(getSnapShotFromUserAuth, user, additionalInfo);
}

// entry point for SIGN_UP_SUCCESS action
export function* onSignUpSuccess() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// listen all user action, parellel run corresponding sagas
export function* userSagas() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignOut),
		call(onSignUpStart),
		call(onSignUpSuccess),
	]);
}