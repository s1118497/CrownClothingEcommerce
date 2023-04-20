import { createContext, useContext, useReducer } from "react";

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

const INIT_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

const CartContext = createContext(INIT_STATE);

const CART_ACTION_TYPES = {
	ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
	TOGGLE_CART_OPEN: "TOGGLE_CART_OPEN",
	REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
	CLEAR_CART_ITEMS: "CLEAR_CART_ITEMS",
};

const cartReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
			return {
				...state,
				cartItems: payload,
				cartCount: state.cartCount + 1,
				cartTotal: payload.reduce(
					(total, { quantity, price }) => quantity * price + total,
					0
				),
			};
		case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
			return {
				...state,
				cartItems: payload,
				cartCount: state.cartCount - 1,
				cartTotal: payload.reduce(
					(total, { quantity, price }) => quantity * price + total,
					0
				),
			};
		case CART_ACTION_TYPES.CLEAR_CART_ITEMS:
			return {
				...state,
				cartItems: payload,
				cartTotal: payload.reduce(
					(total, { quantity, price }) => quantity * price + total,
					0
				),
				cartCount: payload.reduce((total, { quantity }) => total + quantity, 0),
			};
		case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
			return { ...state, isCartOpen: payload };
		default:
			throw new Error("Unhandled type " + type + " in userReducer");
	}
};

// Export cart context provider component
export const CartProvider = ({ children }) => {
	const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] = useReducer(
		cartReducer,
		INIT_STATE
	);

	// const cartTotal = useCheckoutTotal(cartItems);
	// const cartCount = useCartCount(cartItems);
	const setIsCartOpen = (cartOpen) =>
		dispatch({ type: CART_ACTION_TYPES.TOGGLE_CART_OPEN, payload: cartOpen });
	const addItemToCart = (productToAdd) =>
		dispatch({
			type: CART_ACTION_TYPES.ADD_ITEM_TO_CART,
			payload: addCartItem(cartItems, productToAdd),
		});
	const removeItemFromCart = (cartItemToRemove) =>
		dispatch({
			type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART,
			payload: removeCartItem(cartItems, cartItemToRemove),
		});
	const clearItemFromCart = (cartItemsToClear) =>
		dispatch({
			type: CART_ACTION_TYPES.CLEAR_CART_ITEMS,
			payload: clearCartItem(cartItems, cartItemsToClear),
		});

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
