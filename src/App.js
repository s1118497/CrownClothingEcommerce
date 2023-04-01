import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";

const App = () => {
	return (
		<Routes>
			{/* <Navigation> will always render in every path */}
			<Route path="/" element={<Navigation />}>
				{/* <Home> will render when root route, at <Navigation>'s <Outlet> */}
				<Route index element={<Home />} />
				<Route path="shop" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
			</Route>
		</Routes>
	);
};

export default App;
