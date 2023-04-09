import { useParams } from "react-router-dom";
import ProductCard from "../../../components/product-card/product-card.component";

const CategoryDetail = ({ products }) => {
	const { category } = useParams();
	return (
		<div className="category-preview-container">
			<h2>
				<span className="title">{category.toUpperCase()}</span>
			</h2>
			<div className="preview">
				{products.map((product) => (
					<ProductCard key={product.id} {...product} />
				))}
			</div>
		</div>
	);
};

export default CategoryDetail;
