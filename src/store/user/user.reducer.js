import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = { currentUser: null, isLoading: false, error: null };

export const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_ACTION_TYPES.CHECK_USER_SESSION:
			return { ...state, isLoading: true };
		case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
			return { ...state, isLoading: true };
		case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
			return { ...state, isLoading: true };
		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
			return { ...state, isLoading: false, currentUser: payload, error: null };
		case USER_ACTION_TYPES.SIGN_IN_FAIL:
		case USER_ACTION_TYPES.SIGN_UP_FAIL:
		case USER_ACTION_TYPES.SIGN_OUT_FAIL:
			// match either case
			return { ...state, isLoading: false, error: payload };
		case USER_ACTION_TYPES.SIGN_OUT_START:
			return { ...state, isLoading: true };
		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
			return { ...state, isLoading: false, currentUser: null, error: null };
		case USER_ACTION_TYPES.SIGN_UP_START:
			return { ...state, isLoading: true };
		default:
			// unrelated action will return state by reference
			//      prevent user reducer from updating state
			return state;
	}
};
