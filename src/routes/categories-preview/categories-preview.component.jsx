import { useSelector } from "react-redux";
import { selectCatogoriesMap } from "../../store/categories/category.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCatogoriesMap);
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
