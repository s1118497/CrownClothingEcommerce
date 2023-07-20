import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import CartIcon from "../cart-icon.component";

describe("Cart Icon tests", () => {
	test("Uses preloaded state to render", () => {
		const initialCartItem = [
			{ id: 1, imageUrl: "www", name: "item A", price: 333, quantity: 1 },
			{ id: 2, imageUrl: "www", name: "item B", price: 444, quantity: 3 },
		];

		// preloaded state need to match the shape of root state/reducer
		renderWithProviders(<CartIcon />, {
			preloadedState: { cart: { cartItems: initialCartItem } },
		});

		// cart icon span should display "4" (1 + 3 qty)
		const cartIconElement = screen.getByText("4");
		expect(cartIconElement).toBeInTheDocument();
	});
});
