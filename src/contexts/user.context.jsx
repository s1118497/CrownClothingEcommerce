import { useState, useEffect, createContext, useContext } from "react";
import {
	createUserDocFromAuth,
	onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

// creates a context container dedicated to current user info
const UserContext = createContext({
	currentUser: null,
	setCurrentUser() {
		return null;
	},
});

// custom hook for using the UserContext value
export const useUserContext = () => useContext(UserContext);

// all children can *access* & *update* current user info via useContext(UserContext)
export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		// user = user account <sign in> | null <sign out>
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				// when sign-in, get that user's userDoc from firestore
				createUserDocFromAuth(user);
			}
			setCurrentUser(user);
		});
		return unsubscribe;
	}, []);

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	);
};
