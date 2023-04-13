import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";

const CategoryPreview = ({ categoryTitle, products }) => {
	return (
		<div className="category-preview-container">
			<h2>
				{/* Now at route level: "/shop", to will autofill prefix with "/shop/{categoryTitle}" */}
				<Link className="title" to={categoryTitle}>
					{categoryTitle.toUpperCase()}
				</Link>
			</h2>
			<div className="preview">
				{/* only showcase 4 products for each category */}
				{products &&
					products
						.filter((_, idx) => idx < 4)
						.map((product) => <ProductCard key={product.id} {...product} />)}
			</div>
		</div>
	);
};

export default CategoryPreview;
