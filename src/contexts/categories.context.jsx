import { createContext, useContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({ categoryMap: [] });

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});
	// sync firestore categories collection to context when provider mount
	// 	*NOTE*
	// 		if useCategoriesContext() in any component, the categoriesMap = {}, at initial mount
	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();
			setCategoriesMap(categoryMap);
		};
		getCategoriesMap();
	}, []);

	const value = { categoriesMap };
	return <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>;
};

export const useCategoriesContext = () => useContext(CategoriesContext);
