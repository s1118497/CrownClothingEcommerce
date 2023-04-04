import { createContext, useContext, useEffect, useState } from "react";

// a helper function for setCartItems (ADD / INCREMENT checkout)
const addCartItem = (cartItems, productToAdd) => {
	// create a new cart array to prevent mutation
	const newCartItems = [...cartItems];

	// find if existing cartItems contains that productToAdd
	const existedIndex = cartItems.findIndex(
		(currentCartItem) => currentCartItem?.id === productToAdd.id
	);

	// if found, increament quantity
	if (existedIndex >= 0) {
		const existedITem = cartItems[existedIndex];
		newCartItems[existedIndex] = { ...existedITem, quantity: existedITem.quantity + 1 };
	}
	// if not found add the all product to cart
	if (existedIndex === -1) newCartItems.push({ ...productToAdd, quantity: 1 });

	// return new array with modified cartItems / new cart item
	return newCartItems;
};

// a helper function for setCartItems (REMOVE/ DECREMENT checkout)
const removeCartItem = (cartItems, cartItemToRemove) => {
	// find the cart item to remove
	const existingCartItem = cartItems.find(
		(currentCartItem) => currentCartItem.id === cartItemToRemove.id
	);

	// check if quantity is equal to 1, if so, remove the cart item and return new array
	if (existingCartItem.quantity === 1)
		return cartItems.filter((currentCartItem) => currentCartItem.id !== cartItemToRemove.id);

	// if quantity > 1, decrement quantity and return new array
	return cartItems.map((currentCartItem) =>
		currentCartItem.id === cartItemToRemove.id
			? { ...currentCartItem, quantity: currentCartItem.quantity - 1 }
			: currentCartItem
	);
};

// a helper function for setCartItems (CLEAR checkout item)
const clearCartItem = (cartItems, cartItemToClear) =>
	cartItems.filter((currentCartItem) => currentCartItem.id !== cartItemToClear.id);

// a custom hook encapsulate cartCount logic
const useCartCount = (cartItems) => {
	const [cartCount, setCartCount] = useState(0);
	useEffect(() => {
		const newCartCount = cartItems.reduce((total, currItem) => total + currItem.quantity, 0);
		setCartCount(newCartCount);
	}, [cartItems]);
	return cartCount;
};

// a custom hook encapsulate cartTotal logic
const useCheckoutTotal = (cartItems) => {
	const [cartTotal, setCartTotal] = useState(0);
	useEffect(() => {
		setCartTotal(cartItems.reduce((total, { quantity, price }) => quantity * price + total, 0));
	}, [cartItems]);

	return cartTotal;
};

const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartCount: 0,
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartTotal: 0,
});

// Export cart context provider component
export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);

	const cartTotal = useCheckoutTotal(cartItems);
	const cartCount = useCartCount(cartItems);

	const addItemToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));

	const removeItemFromCart = (cartItemToRemove) =>
		setCartItems(removeCartItem(cartItems, cartItemToRemove));

	const clearItemFromCart = (cartItemsToClear) =>
		setCartItems(clearCartItem(cartItems, cartItemsToClear));

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		cartCount,
		removeItemFromCart,
		cartTotal,
		clearItemFromCart,
	};
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
