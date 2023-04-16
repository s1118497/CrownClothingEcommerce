import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {
	return (
		<Routes>
			{/* 
				match url = " /shop "
					same effect: <Route path="/" element={<CategoriesPreview />} />
			 */}
			<Route index element={<CategoriesPreview />} />
			{/* match url = " /shop/xxx", 
					xxx = variable pass to url from navigation, e.g. to="xxx" | navigate("xxx")
			 */}
			<Route path="/:category" element={<Category />} />
		</Routes>
	);
};

export default Shop;
