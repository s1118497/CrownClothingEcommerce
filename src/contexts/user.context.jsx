import { useReducer, useEffect, createContext, useContext } from "react";
import {
	createUserDocFromAuth,
	onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

// creates a context container dedicated to current user info
const UserContext = createContext({
	currentUser: null,
});

// define action constant
const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
};
// a reducer function used in <UserProvider> reducer hook
const userReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return { ...state, currentUser: payload };
		default:
			throw new Error("Unhandled type " + type + " in userReducer");
	}
};

// all children can *access* & *update* current user info via useContext(UserContext)
export const UserProvider = ({ children }) => {
	const [{ currentUser }, dispatch] = useReducer(userReducer, { currentUser: null });

	// a helper function that dispatch an action object to reducer function
	const setCurrentUser = (user) =>
		dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });

	// attach an auth observer when initial mount,
	// 		 whenever sign-in/out, provoke the callback (updating "currentUser" state value)
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			// user = {user account} when sign in || null when sign out
			if (user) {
				// when sign-in, get that user's userDoc from firestore
				createUserDocFromAuth(user);
			}
			setCurrentUser(user);
		});
		return unsubscribe;
	}, []);

	return <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>;
};

// custom hook for using the UserContext value
export const useUserContext = () => useContext(UserContext);
