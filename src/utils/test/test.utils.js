// rewrite render method with redux provider for testing redux logic
//      https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function

import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "../../store/root-reducer";
import { BrowserRouter } from "react-router-dom";

export function renderWithProviders(
	ui,
	{ preloadedState = {}, store = createStore(rootReducer, preloadedState), ...renderOptions } = {}
) {
	const Wrapper = ({ children }) => {
		return (
			<BrowserRouter>
				<Provider store={store}>{children}</Provider>
			</BrowserRouter>
		);
	};

	// https://testing-library.com/docs/react-testing-library/setup/#custom-render
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
