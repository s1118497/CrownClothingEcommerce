import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";

// for testing
const Shop = () => <h3>Shop</h3>;

const App = () => {
	return (
		<Routes>
			{/* <Navigation> will always render in any path */}
			<Route path="/" element={<Navigation />}>
				{/* <Home> will render when root route, at <Navigation>'s <Outlet> */}
				<Route index element={<Home />} />
				<Route path="shop" element={<Shop />} />
			</Route>
		</Routes>
	);
};

export default App;
