import { userReducer, INITIAL_STATE } from "../user.reducer";
import { signOutFail, signUpFail, signInFail, signInSuccess, signOutSuccess } from "../user.action";

const mockError = new Error("test error");

describe("user reducer tests", () => {
	it("should return initial state", () => {
		const result = userReducer(undefined, {});
		expect(result).toEqual(INITIAL_STATE);
	});

	it("signInSuccess should update currentUser", () => {
		const mockUser = { id: 1, email: "testEmail" };
		const result = userReducer(INITIAL_STATE, signInSuccess(mockUser));
		expect(result).toEqual({ ...INITIAL_STATE, currentUser: mockUser });
	});

	it("signOutSuccess should set currentUser to null", () => {
		const result = userReducer(INITIAL_STATE, signOutSuccess());
		expect(result).toEqual({ ...INITIAL_STATE, currentUser: null });
	});

	it("signOutFailed should set an error", () => {
		const mockError = new Error("error in sign out");
		const result = userReducer(INITIAL_STATE, signOutFail(mockError));
		expect(result).toEqual({ error: mockError, currentUser: null });
	});

	it("signInFail should set an error", () => {
		const mockError = new Error("error in sign in");
		const result = userReducer(INITIAL_STATE, signInFail(mockError));
		expect(result).toEqual({ error: mockError, currentUser: null });
	});

	it("signUpFail should set an error", () => {
		const mockError = new Error("error in sign up");
		const result = userReducer(INITIAL_STATE, signUpFail(mockError));
		expect(result).toEqual({ error: mockError, currentUser: null });
	});
});
