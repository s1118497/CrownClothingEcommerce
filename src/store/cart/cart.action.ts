import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducers/reducer.utils";
import { CART_ACTION_TYPES, Product } from "./cart.types";
import { CategoryItem } from "../categories/category.types";

// helper functions to return new cartItems array accordingly.
const addCartItem = (cartItems: Product[], productToAdd: CategoryItem): Product[] => {
	// create a new cart array to prevent mutation
	const newCartItems = [...cartItems];

	// find if existing cartItems contains that productToAdd
	const existedIndex = cartItems.findIndex(
		(currentCartItem) => currentCartItem.id === productToAdd.id
	);

	// if found, increament quantity
	if (existedIndex >= 0) {
		const existedItem = cartItems[existedIndex];
		newCartItems[existedIndex] = {
			...existedItem,
			quantity: existedItem.quantity + 1,
		};
	}
	// if not found add the all product to cart
	if (existedIndex === -1) newCartItems.push({ ...productToAdd, quantity: 1 });

	// return new array with modified cartItems / new cart item
	return newCartItems;
};
const removeCartItem = (cartItems: Product[], cartItemToRemove: Product): Product[] => {
	// find the cart item to remove
	const existingCartItem = cartItems.find(
		(currentCartItem) => currentCartItem.id === cartItemToRemove.id
	);

	// check if quantity is equal to 1, if so, remove the cart item and return new array
	if ((existingCartItem as Product).quantity === 1)
		return cartItems.filter((currentCartItem) => currentCartItem.id !== cartItemToRemove.id);

	// if quantity > 1, decrement quantity and return new array
	return cartItems.map((currentCartItem: Product) =>
		currentCartItem.id === cartItemToRemove.id
			? { ...currentCartItem, quantity: currentCartItem.quantity - 1 }
			: currentCartItem
	);
};
const clearCartItem = (cartItems: Product[], cartItemToClear: Product): Product[] =>
	cartItems.filter((currentCartItem) => currentCartItem.id !== cartItemToClear.id);

// Define each action creator return as a Action type:
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, Product[]>;
export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export const setIsCartOpen = withMatcher(
	(boolean: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

// A generic withMatcher decorator function for add/remove/clear item
export const setCartItems = withMatcher(
	(newCartItems: Product[]): SetCartItems =>
		createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
);

export const addItemToCart = (cartItems: Product[], productToAdd: CategoryItem) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: Product[], cartItemToRemove: Product) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: Product[], cartItemsToClear: Product) => {
	const newCartItems = clearCartItem(cartItems, cartItemsToClear);
	return setCartItems(newCartItems);
};
