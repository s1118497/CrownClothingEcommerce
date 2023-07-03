import { useEffect, lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";

import { checkUserSession } from "./store/user/user.action";

import Spinner from "./components/spinner/spinner.component";

// Static Import
// import Home from "./routes/home/home.component";
// import Authentication from "./routes/authentication/authentication.component";
// import Shop from "./routes/shop/shop.component";
// import Checkout from "./routes/checkout/checkout.component";
// import Navigation from "./routes/navigation/navigation.component";

// Dynamic Import, lazy load components
const Home = lazy(() => import("./routes/home/home.component"));
const Navigation = lazy(() => import("./routes/navigation/navigation.component"));
const Authentication = lazy(() => import("./routes/authentication/authentication.component"));
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(checkUserSession());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Suspense fallback={<Spinner />}>
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
		</Suspense>
	);
};

export default App;
