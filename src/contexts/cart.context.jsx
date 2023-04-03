import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext({ items: null, isCartOpen: null });

// a helper function for setCartItems (ADD)
const addCartItem = (cartItems, productToAdd) => {
	// create a new cart array to prevent mutation
	const newCartItems = [...cartItems];

	// find if existing cartItems contains that productToAdd
	const existedIndex = cartItems.findIndex(
		(currentCartItem) => currentCartItem?.id === productToAdd.id
	);

	// if found, increament quantity
	if (existedIndex >= 0) newCartItems[existedIndex].quantity += 1;
	// if not found add the all product to cart
	if (existedIndex === -1) newCartItems.push({ ...productToAdd, quantity: 1 });

	// return new array with modified cartItems / new cart item
	return newCartItems;
};

// a helper function for setCartItems (REMOVE)
const removeCartItem = (cartItems, productToRemove) =>
	cartItems.filter((currentCartItem) => currentCartItem.id !== productToRemove.id);

// a helper function for setCartItems (INCREMENT / DECREMENT Quantity)
// 	export the mode constant for <CheckoutItem>
export const QUANTITY_MODE = { add: "INCREMENT", reduce: "DECREMENT" };

const modCheckoutQuantity = (cartItems, productToModify, mode) =>
	// return new array with incre/decre quantity
	cartItems.map((currentCartitem) => {
		if (currentCartitem.id === productToModify.id) {
			if (mode === "INCREMENT")
				return { ...currentCartitem, quantity: currentCartitem.quantity + 1 };
			if (mode === "DECREMENT" && currentCartitem.quantity > 1)
				return { ...currentCartitem, quantity: currentCartitem.quantity - 1 };
		}
		return currentCartitem;
	});

// a helper function for calculating total price
const countTotalPrice = (cartItems) =>
	cartItems.reduce(
		(total, currentCartItem) => currentCartItem.quantity * currentCartItem.price + total,
		0
	);

// a custom hook encapsulate cartCount logic
const useCartCount = (cartItems) => {
	const [cartCount, setCartCount] = useState(0);
	useEffect(() => {
		const newCartCount = cartItems.reduce((total, currItem) => total + currItem.quantity, 0);
		setCartCount(newCartCount);
	}, [cartItems]);
	return cartCount;
};

// Export cart context provider component
export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);

	const cartCount = useCartCount(cartItems);

	const addItemToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));

	const removeItemFromCart = (productToRemove) =>
		setCartItems(removeCartItem(cartItems, productToRemove));

	const modifyItemQuantity = (productToModify, mode) =>
		setCartItems(modCheckoutQuantity(cartItems, productToModify, mode));

	const totalCheckoutPrice = countTotalPrice(cartItems);

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		cartCount,
		removeItemFromCart,
		modifyItemQuantity,
		totalCheckoutPrice,
	};
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
