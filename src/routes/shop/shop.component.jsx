import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import { setCategoriesMap } from "../../store/categories/category.action";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {
	// sync categories from firestore collection to redux state
	useCategoriesMap();
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

// custom hook when <Shop> is first mount
const useCategoriesMap = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesMap = await getCategoriesAndDocuments();
			dispatch(setCategoriesMap(categoriesMap));
		};
		getCategoriesMap();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default Shop;
