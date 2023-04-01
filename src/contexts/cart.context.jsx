import { createContext, useContext, useState } from "react";

const CartContext = createContext({ items: null, isCartOpen: null });

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState({ items: null, isCartOpen: false });
	return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
