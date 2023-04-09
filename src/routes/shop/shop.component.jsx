import { Routes, Route, useParams } from "react-router-dom";
import { useCategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import CategoryDetail from "./category-detail/category-detail.component";
import "./shop.styles.scss";

const Shop = () => {
	const { categoriesMap } = useCategoriesContext();
	const param = useParams();
	if (param["*"])
		return (
			<Routes>
				<Route
					path=":category"
					element={<CategoryDetail products={categoriesMap[param["*"]]} />}
				/>
			</Routes>
		);

	return (
		<div className="shop-container">
			{Object.keys(categoriesMap).map((categoryTitle) => {
				const products = categoriesMap[categoryTitle];
				return (
					<CategoryPreview
						key={categoryTitle}
						categoryTitle={categoryTitle}
						products={products}
					/>
				);
			})}
		</div>
	);
};

export default Shop;
