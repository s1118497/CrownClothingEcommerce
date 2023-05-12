import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { createUserDocFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.slice";

import { useDispatch } from "react-redux";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
	useAuthStateObserver();
	return (
		<Routes>
			{/* <Navigation> will always render in every path */}
			<Route path="/" element={<Navigation />}>
				{/* <Home> will render when root route, at <Navigation>'s <Outlet> */}
				<Route index element={<Home />} />
				{/*  	match any route that prefix "/shop/"	*/}
				<Route path="shop/*" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
};

// custom hook to sync auth user when <App> is mount
const useAuthStateObserver = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			// user = {user account} when sign in || null when sign out
			if (user) {
				createUserDocFromAuth(user);
			}
			// IIFE, to comply with redux/toolkit middleware opinion
			const serializedUser =
				user && (({ accessToken, email }) => ({ accessToken, email }))(user);
			// now payload is a plain object, which is serializable
			dispatch(setCurrentUser(serializedUser));
		});
		return unsubscribe;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default App;
