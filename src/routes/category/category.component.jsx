import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	selectCatogoriesMap,
	selectCategoriesIsLoading,
} from "../../store/categories/category.selector";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";

const useCategoryProducts = () => {
	// path = " /shop/:category "
	const { category } = useParams();
	const categoriesMap = useSelector(selectCatogoriesMap);
	const [products, setProducts] = useState(categoriesMap[category]);
	//	only update products when category param or categoriesMap data change
	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return { products, category };
};

export default function Category() {
	const { products, category } = useCategoryProducts();
	const isLoading = useSelector(selectCategoriesIsLoading);
	if (isLoading) return <Spinner />;
	return (
		<>
			<CategoryTitle>{category.toUpperCase()}</CategoryTitle>
			<CategoryContainer>
				{products &&
					products.map((product) => <ProductCard key={product.id} {...product} />)}
			</CategoryContainer>
		</>
	);
}

// //--------- better approach?  when refresh only render 2 time

// export default function Category() {
// 	const { category } = useParams();
// 	const { categoriesMap } = useCategoriesContext();
// 	console.log(categoriesMap); // for testing: when refresh, {} => {categorieMap}
// 	const products = categoriesMap[category];

// 	return (
// 		<div className="category-container">
// 			<h2>
// 				<span className="title">{category.toUpperCase()}</span>
// 			</h2>
// 			<div className="category-body-container">
// 				{products &&
// 					products.map((product) => <ProductCard key={product.id} {...product} />)}
// 			</div>
// 		</div>
// 	);
// }
