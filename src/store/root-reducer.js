import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.slice";
import { categoriesReducer } from "./categories/category.slice";
import { cartReducer } from "./cart/cart.slice";

export default combineReducers({
	user: userReducer,
	categories: categoriesReducer,
	cart: cartReducer,
});
