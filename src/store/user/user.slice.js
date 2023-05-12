import { createSlice } from "@reduxjs/toolkit";

// import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = { currentUser: null };

export const userSlice = createSlice({
	name: "user",
	initialState: INITIAL_STATE,
	reducers: {
		//  will handle the action type {"user"}/{"setCurrentUser"}
		setCurrentUser: (state, action) => {
			// createSlice allow writing mutation style state update, which leverage immer under the hood
			state.currentUser = action.payload;
		},
	},
});

/* createSlice will return an object that looks like:
	{
		name : string,
		reducer : ReducerFunction,
		actions : Record<string, ActionCreator>,
		caseReducers: Record<string, CaseReducer>.
		getInitialState: () => State
	} 
*/

// export action method
export const { setCurrentUser } = userSlice.actions;

// export reducer function that pass to the root reducer
export const userReducer = userSlice.reducer;
