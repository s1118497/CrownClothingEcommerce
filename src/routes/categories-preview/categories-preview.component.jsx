import { useCategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
	const { categoriesMap } = useCategoriesContext();
	const categoriesTitleArr = Object.keys(categoriesMap);

	return (
		<>
			{categoriesTitleArr.map((categoryTitle) => {
				const products = categoriesMap[categoryTitle];
				return (
					<CategoryPreview
						key={categoryTitle}
						categoryTitle={categoryTitle}
						products={products}
					/>
				);
			})}
		</>
	);
};

export default CategoriesPreview;
