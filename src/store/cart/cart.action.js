import { createAction } from "../../utils/reducers/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = () => createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN);

export const addItemToCart = (productToAdd) =>
	createAction(CART_ACTION_TYPES.ADD_CART_ITEMS, productToAdd);

export const removeItemFromCart = (cartItemToRemove) =>
	createAction(CART_ACTION_TYPES.REMOVE_CART_ITEMS, cartItemToRemove);

export const clearItemFromCart = (cartItemsToClear) =>
	createAction(CART_ACTION_TYPES.CLEAR_CART_ITEMS, cartItemsToClear);
