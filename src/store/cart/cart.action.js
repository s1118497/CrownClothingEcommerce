import { createAction } from "../../utils/reducers/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

// helper functions to return new cartItems array accordingly.
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
const clearCartItem = (cartItems, cartItemToClear) =>
	cartItems.filter((currentCartItem) => currentCartItem.id !== cartItemToClear.id);

// return an action object, payload = new cartItems array
export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const clearItemFromCart = (cartItems, cartItemsToClear) => {
	const newCartItems = clearCartItem(cartItems, cartItemsToClear);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
