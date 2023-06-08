// a helper function to return action object, simply pass type & payload as arguments

// any action object that have a property type: XXX
import { AnyAction } from "redux";

//#region   define decorator function withMatcher() & return type Matchable

// define Matchable type = decorated action creation function
type Matchable<AC extends () => AnyAction> = AC & {
	// type:  return of AC actionCreator() = Action object "type" property's type {type: xxx} = xxx type
	type: ReturnType<AC>["type"];
	// A user-defined type guard function: type definition
	// 		compare incoming action against actionCreator return type.
	// 			if return value is true, use type predicate to narrow the incoming action type
	// 				e.g. action is FetchCategoriesSuccess or FetchCategoriesStart etc..
	match: (action: AnyAction) => action is ReturnType<AC>;
};

// // withMatcher utility function is used to decorate fetch categories action function, return Matchable type (decorated action creation function)
// // 	 Parameter: specific reducer actionCreator function (e.g. cart, user, categories)
// // 	 Return: decorated reducer actionCreator function

// // Note: why need AnyAction & { type: string }?
// // 		Because AnyAction's type property value is "any" type,
// // 			insect with {type: string } can type narrowing "type" property value

// function overloading, action creater with no argument
export function withMatcher<AC extends () => AnyAction & { type: string }>(
	actionCreator: AC
): Matchable<AC>;
// function overloading, action creater with payload & other arguments
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(
	actionCreator: AC
): Matchable<AC>;

// implementation signature
// 	Note:
// 		actionCreator type here will further narrow as generic AC anyway
export function withMatcher(actionCreator: Function) {
	// Here actionCreator is any redux action creation function
	// 		actionCreator() return type Action / ActionWithPayload
	const { type } = actionCreator();
	// attach match method to actionCreator function object and return, i.e. type Matchable<AC>
	return Object.assign(actionCreator, {
		type: type,
		// A user-defined type guard function: function implementation
		//	 compare any action type that receive (action.type) vs. desirable actionCreator type (type)
		match(action: AnyAction) {
			return action.type === type;
		},
	});
}

/* --------------- My Simplied withMatcher: combine parameter type declare + return type inference + no overloading only implementaton
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(
	actionCreator: AC
) {
	const { type } = actionCreator();
	return Object.assign(actionCreator, {
		type,
		match(action: AnyAction) {
			return action.type === type;
		},
	});
}
 */
//#endregion

//#region   action object types
export type Action<T> = {
	type: T;
};

export type ActionWithPayload<T, P> = {
	type: T;
	payload: P;
};
//#endregion

//#region general action creation function type
// function overloading,
//      Same function based on parameter number/types, return different types

// Note:
// 		"extends" can add constraint to generic interface T, only "string" rather than "any" type.
// 				https://willh.gitbook.io/typescript-tutorial/advanced/generics#fan-xing-yao-shu
// 		for overload signature defination, parameter number have to same as implementation signature, even payload type is void (null/undefined)

// Note:
// 		enum CATEGORIES_ACTION_TYPES is acceptable as string, because enum value is initialized as string
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
// overload signature
export function createAction<T extends string>(type: T, payload: void): Action<T>;

// implementation signature
export function createAction<T extends string, P>(type: T, payload: P) {
	return {
		type,
		payload,
	};
}
//#endregion
