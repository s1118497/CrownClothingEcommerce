import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import rootReducer from "./root-reducer";

// 161 - create custom middleware
const myLogger = (store) => (next) => (action) => {
	if (!action.type) return next(action);
	console.log("type =>", action.type);
	console.log("payload=> ", action.payload);
	console.log("current state=> ", store.getState());
	// react-logger need to pass the action to reducer (update state), in order to log next state
	//  --> explain why running selector before rerendering component
	next(action);
	console.log("next state=> ", store.getState());
};

// create a middleware chain to be applied
// const middleWares = [logger];
const middleWares = [myLogger];

// compose a enhancers chain, (middleware is one of the enhancer)
const composedEnhancers = compose(applyMiddleware(...middleWares));

// return a single Redux store that lets you read the state, dispatch actions, and subscribe to changes.
export const store = createStore(rootReducer, undefined, composedEnhancers);
