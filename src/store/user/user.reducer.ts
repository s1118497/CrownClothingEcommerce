import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import { signInSuccess, signInFail, signOutSuccess, signOutFail, signUpFail } from "./user.action";
// import { USER_ACTION_TYPES } from "./user.types";

export type UserState = {
	readonly currentUser: null | UserData;
	readonly error: null | Error;
};
const INITIAL_STATE = { currentUser: null, error: null };

export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => {
	//#region switch statement version?
	/* switch (action.type) {
		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
			return { ...state, error: null, currentUser:action.payload };
		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
			return { ...INITIAL_STATE };
		case USER_ACTION_TYPES.SIGN_IN_FAIL:
		case USER_ACTION_TYPES.SIGN_OUT_FAIL:
		case USER_ACTION_TYPES.SIGN_UP_FAIL:
			return { ...state, error: action.payload, currentUser: null };
		default:
			return state;
	} */
	//#endregion
	if (signInSuccess.match(action)) return { ...state, error: null, currentUser: action.payload };
	if (signOutSuccess.match(action)) return { ...INITIAL_STATE };
	if (signInFail.match(action) || signOutFail.match(action) || signUpFail.match(action))
		return { ...state, error: action.payload, currentUser: null };

	return state;
};
