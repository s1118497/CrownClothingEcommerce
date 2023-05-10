import { compose, createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./root-reducer";

// // "cart" redux reducer value will store at browser's localStorage
// //		cart state value will stay (rehydrated) after refresh, so UI render based on previous session
// // *note*
// // 		1. "user", "categories" blacklist because already store at firebase cloud storage, avoid unexpected conflict
// // 		2. The main features of localStorage are: Shared between all tabs and windows from the same origin. The data does not expire. It remains after the browser restart and even OS reboot.
// const persistConfig = {
// 	key: "root",
// 	storage,
// 	blacklist: ["user", "categories"], // user reducer will not be persist
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // create a middleware chain array to be applied
// // *note*
// // 		in "production" mode, we won't console.log anything
// // 			so return [logger] only when in "development" or other testing enviroment
const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(Boolean);
// // const middleWares = [process.env.NODE_ENV === "development" && myLogger].filter(Boolean);

// // when not in production env && in browser && redux devtools extension installed,
// // 		then use the redux devtools compose so that enable redux extension in browser;
// // 			otherwise use redux compose
// const composeEnhancer =
// 	(process.env.NODE_ENV !== "production" &&
// 		window &&
// 		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
// 	compose;

// // compose a enhancers chain, (middleware is one of the enhancer)
// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// // return a single Redux store that lets you read the state, dispatch actions, and subscribe to changes.
export const store = configureStore({
	reducer: rootReducer,
	// middleware: middleWares,
});

// export const persistor = persistStore(store);
