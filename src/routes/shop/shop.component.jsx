import { useProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss";

const Shop = () => {
	const products = useProductsContext();
	return (
		<div className="products-container">
			{products.map(({ id, ...product }) => (
				<ProductCard key={id} {...product} />
			))}
		</div>
	);
};

export default Shop;
