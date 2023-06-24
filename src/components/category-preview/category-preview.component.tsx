import { FC } from "react";
import { CategoryItem } from "../../store/categories/category.types";
import ProductCard from "../product-card/product-card.component";
import { Preview, Title, CategoryPreviewContainer } from "./category-preview.styles";

type CategoryPreviewProps = {
	categoryTitle: string;
	products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ categoryTitle, products }) => {
	return (
		<CategoryPreviewContainer>
			<h2>
				{/* Now at route level: "/shop", to will autofill prefix with "/shop/{categoryTitle}" */}
				<Title to={categoryTitle}>{categoryTitle.toUpperCase()}</Title>
			</h2>
			<Preview>
				{/* only showcase first 4 products for each category */}
				{products &&
					products
						.filter((_, idx) => idx < 4)
						.map((product) => <ProductCard key={product.id} {...product} />)}
			</Preview>
		</CategoryPreviewContainer>
	);
};

export default CategoryPreview;
