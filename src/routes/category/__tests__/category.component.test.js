import { screen } from "@testing-library/react";

import Category from "../category.component";
import { renderWithProviders } from "../../../utils/test/test.utils";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: () => ({ category: "mens" }),
}));

describe("Category tests", () => {
	it("should render a Spinner if isLoading is true", () => {
		const preloadedState = {
			categories: {
				categories: [],
				isLoading: true,
			},
		};
		renderWithProviders(<Category />, { preloadedState });
		// find the <Spinner>
		const SpinnerElement = screen.getByTestId(/spinner/i);
		expect(SpinnerElement).toBeInTheDocument();
	});

	it("should render products if isLoading is false AND items present", () => {
		const preloadedState = {
			categories: {
				categories: [
					{
						items: [
							{ id: 1, name: "Product Name1" },
							{ id: 2, name: "Product Name2" },
						],
						title: "mens",
					},
				],
				isLoading: false,
			},
		};
		renderWithProviders(<Category />, { preloadedState });
		const SpinnerElement = screen.queryByTestId(/test/i);
		// should not render <Spinner>
		expect(SpinnerElement).toBeNull();
		// find the mock product
		const Product2Element = screen.getByText(/Product Name2/i);
		expect(Product2Element).toBeInTheDocument();
	});
});
