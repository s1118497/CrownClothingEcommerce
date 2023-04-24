import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCatogoriesMap } from "../../store/categories/category.selector";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";

// custom hook to synchronize products array against category param
const useCategoryProducts = () => {
	const categoriesMap = useSelector(selectCatogoriesMap);

	// path = " /shop/:category "
	const { category } = useParams();

	const [products, setProducts] = useState(categoriesMap[category]);

	//	only update products when category or categoriesMap change
	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return { products, category };
};

export default function Category() {
	const { products, category } = useCategoryProducts();

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
