// 161 - create custom middleware

// react-logger need to pass the action to reducer (update state), in order to log next state
//  --> explain why running selector before rerendering component

export default function myLogger(store) {
	return function (next) {
		return function (action) {
			// for async dispatch, thunk dispatch a action function instead of action object, then we pass the function to next middleware/reducer
			if (!action.type) return next(action);

			console.log("type =>", action.type);
			console.log("payload=> ", action.payload);
			console.log("current state=> ", store.getState());
			next(action);
			console.log("next state=> ", store.getState());
		};
	};
}