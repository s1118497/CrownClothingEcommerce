import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import ProductCard from "../product-card.component";

describe("Product Card tests", () => {
	it("should add the product item when Product Cart button is clicked", async () => {
		const mockProduct = {
			id: 1,
			imageUrl: "test",
			name: "test",
			price: 1,
		};
		const { store } = renderWithProviders(<ProductCard {...mockProduct} />, {
			preloadedState: {
				cart: {
					cartItems: [],
				},
			},
		});
		const addToCartBtnElement = screen.getByRole("button", { hidden: true });
		fireEvent.click(addToCartBtnElement);
		expect(store.getState().cart.cartItems.length).toBe(1);
		fireEvent.click(addToCartBtnElement);
		// [ { id: 1, imageUrl: 'test', name: 'test', price: 1, quantity: 2 } ]
		console.log(store.getState().cart.cartItems);
		expect(store.getState().cart.cartItems.length).toBe(1);
	});
});
