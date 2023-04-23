import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";

// create a middleware chain to be applied
const middleWares = [logger];

// compose a enhancers chain, (middleware is one of the enhancer)
const composedEnhancers = compose(applyMiddleware(...middleWares));

// return a single Redux store that lets you read the state, dispatch actions, and subscribe to changes.
export const store = createStore(rootReducer, undefined, composedEnhancers);
