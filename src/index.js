import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store, persistor } from "./store/store";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			{/* <PersistGate persistor={persistor} loading={null}> */}
			<BrowserRouter>
				<App />
			</BrowserRouter>
			{/* </PersistGate> */}
		</Provider>
	</React.StrictMode>
);
