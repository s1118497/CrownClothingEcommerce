import { call, put, takeLatest, all } from "redux-saga/effects";

import { signInSuccess, signInFail } from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

import {
	getCurrentUser,
	createUserDocFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

//  final common saga task of checking auth, sign-in & sign-up
export function* getSnapShotFromUserAuth(userAuth, additionalInfo) {
	try {
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
	console.log();
	yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

// parellel run all the sagas
export function* userSagas() {
	yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
