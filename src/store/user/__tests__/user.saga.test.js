import { testSaga, expectSaga } from "redux-saga-test-plan";
import { call } from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import {
	userSagas,
	onCheckUserSession,
	onGoogleSignInStart,
	onEmailSignInStart,
	onSignOutStart,
	onSignUpStart,
	onSignUpSuccess,
	signInAfterSignUp,
	signUp,
	signOut,
	getSnapShotFromUserAuth,
	signInWithEmail,
	signInWithGoogle,
	isUserAuthenticated,
} from "../user.saga";
import { USER_ACTION_TYPES } from "../user.types";
import {
	createAuthUserWithEmailAndPassword,
	signOutUser,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	getCurrentUser,
	createUserDocFromAuth,
} from "../../../utils/firebase/firebase.utils";
import {
	signInFail,
	signInSuccess,
	signOutFail,
	signOutSuccess,
	signUpFail,
	signUpSuccess,
} from "../user.action";

describe("user saga test", () => {
	test("userSagas", () => {
		testSaga(userSagas)
			.next()
			.all([
				call(onCheckUserSession),
				call(onGoogleSignInStart),
				call(onEmailSignInStart),
				call(onSignOutStart),
				call(onSignUpStart),
				call(onSignUpSuccess),
			])
			.next()
			.isDone();
	});

	test("onSignUpStart should takeLatest SIGN_UP_START action and start signUp saga", () => {
		testSaga(onSignUpStart)
			.next()
			.takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
			.next()
			.isDone();
	});

	test("signInAfterSignUp saga should call getSnapShotFromUserAuth and signIn", () => {
		testSaga(signInAfterSignUp, {
			payload: { userAuth: "testUserAuth", displayName: "testDisplayName" },
		})
			.next()
			.call(getSnapShotFromUserAuth, "testUserAuth", { displayName: "testDisplayName" })
			.next()
			.isDone();
	});

	test("onSignUpSuccess should takeLatest SIGN_UP_SUCCESS action and start signInAfterSignUp saga", () => {
		testSaga(onSignUpSuccess)
			.next()
			.takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
			.next()
			.isDone();
	});

	test("onSignOutStart should takeLatest SIGN_OUT_START action and start signOut saga", () => {
		testSaga(onSignOutStart)
			.next()
			.takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
			.next()
			.isDone();
	});

	it("signUp saga success path should call signInAfterSignUp and put signUpSuccess if succesful", () => {
		const mockEmail = "test@gmail.com",
			mockPassword = "testPassword";
		const mockSignUpStartAction = {
			payload: {
				email: mockEmail,
				password: mockPassword,
				displayName: "testDisplayName",
			},
		};
		const mockUserAuth = { userAuth: "test" };
		return expectSaga(signUp, mockSignUpStartAction)
			.provide([
				[call(createAuthUserWithEmailAndPassword, mockEmail, mockPassword), mockUserAuth],
			])
			.put(signUpSuccess(mockUserAuth, { displayName: "testDisplayName" }))
			.run();
	});
	it("signUp saga error path should call createAuthUserWithEmailAndPassword and put signUpFailure if failed", () => {
		const mockEmail = "test@gmail.com",
			mockPassword = "testPassword";
		const mockSignUpStartAction = {
			payload: { email: mockEmail, password: mockPassword },
		};
		const mockError = new Error("sign up fail");

		return expectSaga(signUp, mockSignUpStartAction)
			.provide([
				[
					call(createAuthUserWithEmailAndPassword, mockEmail, mockPassword),
					throwError(mockError),
				],
			])
			.put(signUpFail(mockError))
			.run();
	});

	test("signOut when success", () => {
		testSaga(signOut).next().call(signOutUser).next().put(signOutSuccess()).next().isDone();
	});
	it("signOut when fail", () => {
		const mockError = new Error("sign out fail");
		return expectSaga(signOut)
			.provide([[call(signOutUser), throwError(mockError)]])
			.put(signOutFail(mockError))
			.run();
	});

	test("onEmailSignInStart should takeLatest EMAIL_SIGN_IN_START action and start signInWithEmail saga", () => {
		testSaga(onEmailSignInStart)
			.next()
			.takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
			.next()
			.isDone();
	});

	it("signInWithEmail saga success path should call signInAuthUserWithEmailAndPassword and call getSnapshotFromUserAuth", () => {
		const mockEmail = "testEmail",
			mockPassword = "testPassword";
		const mockUserAuth = { userAuth: "test" };
		return expectSaga(signInWithEmail, {
			payload: { email: mockEmail, password: mockPassword },
		})
			.provide([
				[call(signInAuthUserWithEmailAndPassword, mockEmail, mockPassword), mockUserAuth],
			])
			.call(getSnapShotFromUserAuth, mockUserAuth)
			.run();
	});
	it("signInWithEmail when fail", () => {
		const mockError = new Error("error in signInWithEmail saga");
		return expectSaga(signInWithEmail, {
			payload: { email: "testEmail", password: "testPassword" },
		})
			.provide([
				[
					call(signInAuthUserWithEmailAndPassword, "testEmail", "testPassword"),
					throwError(mockError),
				],
			])
			.put(signInFail(mockError))
			.run();
	});

	test("onGoogleSignInStart should takeLatest GOOGLE_SIGN_IN_START action and start signInWithGoogle saga", () => {
		testSaga(onGoogleSignInStart)
			.next()
			.takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
			.next()
			.isDone();
	});

	it("signInWithGoogle when success", () => {
		const mockUser = { email: "test", displayName: "test", uid: 123 };
		const mockUserCredential = { user: mockUser };
		return expectSaga(signInWithGoogle)
			.provide([[call(signInWithGooglePopup), mockUserCredential]])
			.call(getSnapShotFromUserAuth, mockUserCredential.user)
			.run();
	});
	it("signInWithGoogle when fail", () => {
		const mockError = new Error("google sign in fail");
		return expectSaga(signInWithGoogle)
			.provide([[call(signInWithGooglePopup), throwError(mockError)]])
			.put(signInFail(mockError))
			.run();
	});

	test("onCheckUserSession should take CHECK_USER_SESSION action and run isUserAuthenticated saga", () => {
		testSaga(onCheckUserSession)
			.next()
			.takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
			.next()
			.isDone();
	});

	it("isUserAuthenticated success when current user present", () => {
		const mockUserAuth = { user: "test" };
		return expectSaga(isUserAuthenticated)
			.provide([[call(getCurrentUser), mockUserAuth]])
			.call(getSnapShotFromUserAuth, mockUserAuth)
			.run();
	});
	it("isUserAuthenticated saga error path should put signInFailed if failed", () => {
		const mockUserAuth = { user: "test" };
		const mockError = new Error("fail in authentication");
		return expectSaga(isUserAuthenticated)
			.provide([
				[call(getCurrentUser), mockUserAuth],
				[call(getSnapShotFromUserAuth, mockUserAuth), throwError(mockError)],
			])
			.put(signInFail(mockError))
			.run();
	});

	it("getSnapshotFromUserAuth saga success should call createUserDocumentFromAuth and put signInSuccess", () => {
		const mockUserAuth = { uid: 123 };
		const mockAdditionalInfo = { displayName: "testDisplayName" };
		const mockUserSnapshot = {
			data: () => ({ createdAt: "testCreateAt", email: "test@gmail" }),
		};

		return expectSaga(getSnapShotFromUserAuth, mockUserAuth, mockAdditionalInfo)
			.provide([
				[call(createUserDocFromAuth, mockUserAuth, mockAdditionalInfo), mockUserSnapshot],
			])
			.put(signInSuccess({ ...mockUserSnapshot.data(), id: mockUserAuth.uid }))
			.run();
	});
	it("getSnapshotFromUserAuth saga error path should put signInFailed on error", () => {
		const mockError = new Error("error in createUserDocFromAuth");
		return expectSaga(getSnapShotFromUserAuth, {})
			.provide([[call(createUserDocFromAuth, {}, undefined), throwError(mockError)]])
			.put(signInFail(mockError))
			.run();
	});
});
