// 161 - create custom middleware

// react-logger need to pass the action to reducer (update state), in order to log next state
//  --> explain why running selector before rerendering component

import { Middleware } from "redux";
import { RootState } from "../store";

// Arrow function version  (https://redux.js.org/usage/usage-with-typescript#type-checking-middleware)
const myLogger: Middleware<{}, RootState> = (storeApi) => (next) => (action) => {
	// for async dispatch, thunk dispatch a action function instead of action object, then we pass the function to next middleware/reducer
	if (!action.type) return next(action);

	console.log("type =>", action.type);
	console.log("payload=> ", action.payload);
	console.log("current state=> ", storeApi.getState());
	next(action);
	console.log("next state=> ", storeApi.getState());
};
export default myLogger;

// // function version  (https://redux.js.org/usage/usage-with-typescript#type-checking-middleware);
// // function declaration typing not supported yet? (https://stackoverflow.com/questions/45472944/how-to-define-the-type-of-a-named-function)
// const myLogger: Middleware<{}, RootState> = function (storeApi) {
// 	return function (next) {
// 		return function (action) {
// 			// for async dispatch, thunk dispatch a action function instead of action object, then we pass the function to next middleware/reducer
// 			if (!action.type) return next(action);

// 			console.log("type =>", action.type);
// 			console.log("payload=> ", action.payload);
// 			console.log("current state=> ", storeApi.getState());
// 			next(action);
// 			console.log("next state=> ", storeApi.getState());
// 		};
// 	};
// };
// export default myLogger;
