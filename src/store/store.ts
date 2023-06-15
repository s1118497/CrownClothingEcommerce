import { compose, createStore, applyMiddleware, Middleware } from "redux";

// import logger from "redux-logger";
import myLogger from "./middleware/myLogger";

import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import thunk from "redux-thunk";

import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

// creates a Redux middleware and connects the Sagas to the Redux Store
const sagaMiddleware = createSagaMiddleware();

// "cart" redux reducer value will store at browser's localStorage
//		cart state value will stay (rehydrated) after refresh, so UI render based on previous session
// *note*
// 		1. "user", "categories" blacklist because already store at firebase cloud storage, avoid unexpected conflict
// 		2. The main features of localStorage are: Shared between all tabs and windows from the same origin. The data does not expire. It remains after the browser restart and even OS reboot.

type ExtendedPersistConfig = PersistConfig<RootState> & {
	whitelist?: (keyof RootState)[];
};
// type narrow peristConfig's whitelist property

const persistConfig: ExtendedPersistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"], // only cart reducer will be persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// create a middleware chain array to be applied
// *note*
// 		in "production" mode, we won't console.log anything
// 			so return [logger] only when in "development" or other testing enviroment

// const middleWares = [process.env.NODE_ENV !== "production" && logger, sagaMiddleware].filter(
// 	(m): m is Middleware => Boolean(m)
// );
const middleWares = [process.env.NODE_ENV !== "production" && myLogger, sagaMiddleware].filter(
	(m): m is Middleware => Boolean(m)
);

// when not in production env && in browser && redux devtools extension installed,
// 		then use the redux devtools compose so that enable redux extension in browser;
// 			otherwise use redux compose
const composeEnhancer =
	(process.env.NODE_ENV !== "production" &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

// compose a enhancers chain, (middleware is one of the enhancer)
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// return a single Redux store that lets you read the state, dispatch actions, and subscribe to changes.
export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
