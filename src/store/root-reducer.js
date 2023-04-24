import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";

export default combineReducers({ user: userReducer, categories: categoriesReducer });
