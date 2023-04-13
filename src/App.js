import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
	return (
		<Routes>
			{/* <Navigation> will always render in every path */}
			<Route path="/" element={<Navigation />}>
				{/* <Home> will render when root route, at <Navigation>'s <Outlet> */}
				<Route index element={<Home />} />
				{/*  
					If a route path pattern ends with "/*" 
						then it will match any characters following the "/" 
				*/}
				<Route path="shop/*" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;
