import { createSlice } from "@reduxjs/toolkit";

const CART_INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
};

//#region  helper functions to add/decrement/clear cart item, return new cart arry
const addCartItem = (cartItems, productToAdd) => {
	const newCartItems = [...cartItems];

	const existedIndex = cartItems.findIndex(
		(currentCartItem) => currentCartItem?.id === productToAdd.id
	);

	if (existedIndex >= 0) {
		const existingCartItem = cartItems[existedIndex];
		newCartItems[existedIndex] = {
			...existingCartItem,
			quantity: existingCartItem.quantity + 1,
		};
	}
	if (existedIndex === -1) newCartItems.push({ ...productToAdd, quantity: 1 });

	return newCartItems;
};

const removeCartItem = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find(
		(currentCartItem) => currentCartItem.id === cartItemToRemove.id
	);

	if (existingCartItem.quantity === 1) return clearCartItem(cartItems, cartItemToRemove);

	return cartItems.map((currentCartItem) =>
		currentCartItem.id === cartItemToRemove.id
			? { ...currentCartItem, quantity: currentCartItem.quantity - 1 }
			: currentCartItem
	);
};

const clearCartItem = (cartItems, cartItemToClear) =>
	cartItems.filter((currentCartItem) => currentCartItem.id !== cartItemToClear.id);

//#endregion

const cartSlice = createSlice({
	name: "cart",
	initialState: CART_INITIAL_STATE,
	reducers: {
		setIsCartOpen(state, action) {
			state.isCartOpen = action.payload;
		},
		// *note*
		// 		the target cart item passed as action.payload
		// 			and we can pass the current cartItems to helper function, state.cartItems
		// 				rather than useSelector to get current cartItems and pass it in the component
		// 		Also, we can directly "mutate" cart state by assigning new value to cartItems
		addItemToCart(state, action) {
			state.cartItems = addCartItem(state.cartItems, action.payload);
		},
		removeItemFromCart(state, action) {
			state.cartItems = removeCartItem(state.cartItems, action.payload);
		},
		clearItemFromCart(state, action) {
			state.cartItems = clearCartItem(state.cartItems, action.payload);
		},
	},
});

export const cartReducer = cartSlice.reducer;

export const { setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart } =
	cartSlice.actions;
