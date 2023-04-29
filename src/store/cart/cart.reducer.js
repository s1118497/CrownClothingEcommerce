import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

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

// a helper function that encapsulate new action from newCartItems,
// 		to dispatch calculated payload to cart reducer
const updateCartItemsReducer = (newCartItems) => {
	/* pseudo-code:
			- generate newCartTotal
			- generate newCartCount
				- return payload = {newCartItems, newCartTotal, newCartCount}
		*/
	const newCartTotal = newCartItems.reduce(
		(total, { quantity, price }) => quantity * price + total,
		0
	);
	const newCartCount = newCartItems.reduce((total, { quantity }) => total + quantity, 0);
	// advantage: updating 1 state prop (cartItems), automatically update the another 2 at one place ==> readibility + maintainable
	return {
		cartItems: newCartItems,
		cartTotal: newCartTotal,
		cartCount: newCartCount,
	};
};

export function cartReducer(state = INITIAL_STATE, action) {
	const { type, payload } = action;
	switch (type) {
		case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
			return { ...state, isCartOpen: !state.isCartOpen };
		case CART_ACTION_TYPES.ADD_CART_ITEMS: {
			const newCartArr = addCartItem(state.cartItems, payload);
			const newCart = updateCartItemsReducer(newCartArr);
			return { ...state, ...newCart };
		}
		case CART_ACTION_TYPES.REMOVE_CART_ITEMS: {
			const newCartArr = removeCartItem(state.cartItems, payload);
			const newCart = updateCartItemsReducer(newCartArr);
			return { ...state, ...newCart };
		}
		case CART_ACTION_TYPES.CLEAR_CART_ITEMS: {
			const newCartArr = clearCartItem(state.cartItems, payload);
			const newCart = updateCartItemsReducer(newCartArr);
			return { ...state, ...newCart };
		}

		default:
			return state;
	}
}
