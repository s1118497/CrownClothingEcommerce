import { AnyAction } from "redux";
import { Product } from "./cart.types";
import { setIsCartOpen, setCartItems } from "./cart.action";

export type CartState = {
	readonly isCartOpen: boolean;
	readonly cartItems: Product[];
};

const CART_INITIAL_STATE: CartState = {
	isCartOpen: false,
	cartItems: [],
};

export function cartReducer(state = CART_INITIAL_STATE, action: AnyAction): CartState {
	if (setCartItems.match(action)) return { ...state, cartItems: action.payload };
	if (setIsCartOpen.match(action)) return { ...state, isCartOpen: action.payload };
	return state;
}
