import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./category.styles.scss";

// custom hook to synchronize products array against category param
const useCategoryProducts = () => {
	const { categoriesMap } = useCategoriesContext();
	console.log("categoriesMap", categoriesMap); // for testing: when refresh, {} => {categoriesMap} => {categoriesMap} (run render function 1 more time before bail out)
	// path = " /shop/:category "
	const { category } = useParams();
	const [products, setProducts] = useState(categoriesMap[category]);

	//	only update products when category change or categoriesMap change
	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return { products, category };
};

export default function Category() {
	const { products, category } = useCategoryProducts();

	return (
		<>
			<h2 className="category-title">{category.toUpperCase()}</h2>
			<div className="category-container">
				{products &&
					products.map((product) => <ProductCard key={product.id} {...product} />)}
			</div>
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