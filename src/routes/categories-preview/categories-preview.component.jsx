import { useSelector } from "react-redux";
import {
	selectCategoriesIsLoading,
	selectCatogoriesMap,
} from "../../store/categories/category.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCatogoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);
	const categoriesTitleArr = Object.keys(categoriesMap);

	if (isLoading) return <Spinner />;

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
