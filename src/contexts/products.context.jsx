import { createContext, useContext, useState } from "react";
import PRODUCTS from "../shop-data.json";

const ProductsContext = createContext([]);

export const ProductsProvider = ({ children }) => {
	const [products, setProductes] = useState(PRODUCTS);
	return <ProductsContext.Provider value={products}> {children} </ProductsContext.Provider>;
};

export const useProductsContext = () => useContext(ProductsContext);
